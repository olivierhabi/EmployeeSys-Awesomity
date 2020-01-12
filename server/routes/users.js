import express from "express";
import Users from "../controllers/users";
import validateUser from "../helpers/validate/userValidator";

const { validate } = validateUser;

const router = express.Router();

router.post("/auth/signup", validate, Users.create);

export default router;
