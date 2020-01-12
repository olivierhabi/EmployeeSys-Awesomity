import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Users from "./routes/users";
import Employees from "./routes/employees";
import Auth from "./routes/auth";
dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

//API version
const api = "/api";
app.use(api, Users);
app.use(api, Employees);
app.use(api, Auth);

app.get("/", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "Welcome to Employee System API"
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);

export default app;
