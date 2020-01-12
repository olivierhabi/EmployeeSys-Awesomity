import express from "express";
import Users from "../controllers/users";
// import auth from '../middleware/auth';
// import admin from '../middleware/admin';
// import validateUser from '../helpers/validators/signupValidator';

// const { validate } = validateUser;

const router = express.Router();

router.post("/auth/signup", Users.create);
// router.get('/users/:id', Users.getOne);

export default router;
