import express from "express";
import Employees from "../controllers/employees";
// import auth from '../middleware/auth';
// import admin from '../middleware/admin';
// import validateUser from '../helpers/validators/signupValidator';

// const { validate } = validateUser;

const router = express.Router();

router.post("/employees", Employees.create);
router.put("/employees/:id", Employees.update);
router.put("/employees/:id/activate", Employees.activate);
router.put("/employees/:id/suspend", Employees.suspend);
export default router;
