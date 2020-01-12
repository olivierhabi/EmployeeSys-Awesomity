import _ from "lodash";
import isValid from "validator";
import nodemailer from "nodemailer";
import hashPassword from "../helpers/hashPassword";
import { isForOfStatement } from "@babel/types";

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE
});

class Employee {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} user object
   */
  static async create(req, res, next) {
    const password = await hashPassword(req.body.password);
    const values = [
      req.body.name,
      req.body.naId,
      req.body.phone,
      req.body.email,
      req.body.dBirth,
      password,
      req.body.status,
      req.body.position
    ];
    const text = `INSERT INTO employees(employee_name, na_id, phone, email, d_birth, password, status, position) VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`;
    try {
      const { rows } = await pool.query(text, values);

      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "3cf4b9838e4a5a",
          pass: "0ebb6216f7395e"
        }
      });

      var mailOptions = {
        from: '"Task Force" <info@gocloud.com>',
        to: rows[0].email,
        subject: "Your Account Information ",
        text: "Conglaturation to join our Company",
        html: "<h1>Task Force Compnay</h1><p>Your Account is activated!</p>"
      };
      transport.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
          return error;
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return res
        .status(201)
        .send({ status: 201, message: "Employee created successfully" });
    } catch (error) {
      return res.status(400).send({ status: 400, message: error.detail });
    }
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} Employee object
   */
  static async update(req, res) {
    if (isValid.isInt(req.params.id)) {
      const password = await hashPassword(req.body.password);
      const values = [
        req.body.name,
        req.body.naId,
        req.body.phone,
        req.body.email,
        req.body.dBirth,
        password,
        req.body.status,
        req.body.position,
        req.params.id
      ];
      const updateOne = `UPDATE employees SET employee_name=($1), na_id=($2), phone=($3), email=($4), d_birth=($5), password=($6), status=($7), position=($8) WHERE id=($9) returning *`;

      const response = await pool.query(updateOne, values);
      if (response.rows.length == 0) {
        return res
          .status(404)
          .send({ status: 404, message: "Employee not found" });
      }
      const data = response.rows[0];
      return res
        .status(200)
        .send({ status: 200, message: "Employee updated", data });
    }
    return res
      .status(404)
      .send({ status: 404, message: "Employee id not valid" });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} Employee object
   */
  static async activate(req, res) {
    if (isValid.isInt(req.params.id)) {
      const values = ["active", req.params.id];
      const updateOne = `UPDATE employees SET status=($1) WHERE id=($2) returning *`;

      const response = await pool.query(updateOne, values);
      if (response.rows.length == 0) {
        return res
          .status(404)
          .send({ status: 404, message: "Employee not found" });
      }
      const data = response.rows[0];
      return res
        .status(200)
        .send({ status: 200, message: "Employee account is Activated" });
    }
    return res
      .status(404)
      .send({ status: 404, message: "Employee id not valid" });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} Employee object
   */
  static async suspend(req, res) {
    if (isValid.isInt(req.params.id)) {
      const values = ["suspended", req.params.id];
      const updateOne = `UPDATE employees SET status=($1) WHERE id=($2) returning *`;

      const response = await pool.query(updateOne, values);
      if (response.rows.length == 0) {
        return res
          .status(404)
          .send({ status: 404, message: "Employee not found" });
      }
      const data = response.rows[0];
      return res
        .status(200)
        .send({ status: 200, message: "Employee account is Suspended" });
    }
    return res
      .status(404)
      .send({ status: 404, message: "Employee id not valid" });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} employee object
   */
  static async delete(req, res) {
    if (isValid.isInt(req.params.id)) {
      const deleteQuery = `DELETE FROM employees WHERE id=($1) returning *`;

      const { rows } = await pool.query(deleteQuery, [req.params.id]);
      if (rows.length == 0) {
        return res
          .status(404)
          .send({ status: 404, message: "Employee not found" });
      }
      return res
        .status(200)
        .send({ status: 200, message: "Employee account is Deleted" });
    }
    return res
      .status(404)
      .send({ status: 404, message: "Employee id not valid" });
  }
  static async search(req, res) {
    if (isValid.isInt(req.params.id)) {
      const employee = `SELECT * FROM employees WHERE id = $1`;
      const getEmployee = await pool.query(employee, [req.params.id]);
      const employees = getEmployee.rows;

      if (employees.length == 0) {
        return res
          .status(404)
          .send({ status: 404, message: "Employee not found" });
      }
      const data = employees[0];
      return res.status(200).send({
        status: 200,
        message: "Employee found successfully",
        data
      });
    }
    return res
      .status(404)
      .send({ status: 404, message: "Employee id not valid" });
  }
}

export default Employee;
