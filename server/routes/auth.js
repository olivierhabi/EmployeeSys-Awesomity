import express from "express";
import Auth from "../controllers/auth";
import validateLogin from "../helpers/validate/loginValidator";

const { validate } = validateLogin;

const router = express.Router();

router.post("/auth/signin/manager", validate, Auth.getOne);

export default router;
