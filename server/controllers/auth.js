import bcrypt from "bcryptjs";
import "@babel/polyfill";
import token from "../helpers/gentoken";

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE
});

class Auth {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} user token
   */
  static async getOne(req, res) {
    const text = `SELECT * FROM users WHERE email = $1`;
    const { rows } = await pool.query(text, [req.body.email]);
    if (!rows[0]) {
      return res
        .status(400)
        .send({ status: 400, message: "Invalid email or password" });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      rows[0].password
    );
    if (!validPassword)
      return res
        .status(400)
        .send({ status: 400, message: "Invalid email or password" });
    const data = await token(rows[0]);
    return res
      .status(200)
      .send({ status: 200, message: "User is successfully logged in", data });
  }
}

export default Auth;
