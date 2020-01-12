import express from "express";
import Employees from "../controllers/employees";
// import auth from '../middleware/auth';
// import admin from '../middleware/admin';
import validateUser from "../helpers/validate/employeeValidator";

const { validate } = validateUser;

const router = express.Router();

router.post("/employees", validate, Employees.create);
router.put("/employees/:id", validate, Employees.update);
router.put("/employees/:id/activate", Employees.activate);
router.put("/employees/:id/suspend", Employees.suspend);
router.delete("/employees/:id", Employees.delete);
router.post("/employees/search/:id", Employees.search);

export default router;
