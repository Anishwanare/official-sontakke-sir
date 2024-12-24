import express from "express";
import { config } from "dotenv";
import cors from "cors";
import MessageRouter from "./Router/MessageRouter.js";
import SchoolRouter from "./Router/SchoolRouter.js";
import StudentRouter from "./Router/StudentRouter.js";
import CoordinatorRouter from "./Router/CoordinatorRouter.js";
import AdminRouter from "./Router/AdminRouter.js";
import { dbConnection } from "./DataBase/dbConnection.js";
import { errorMiddleWare } from "./middleware.js/error.js";

export const app = express();

config({ path: ".env" });

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL || 'http://localhost:5173', 'http://dnyanankur.in'], 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true, 
//     optionsSuccessStatus: 200,
//   })
// );
app.use(
  cors({
    origin: ['http://dnyanankur.in'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);


app.options("*", cors());

//middleware
app.use("/api/v1/message", MessageRouter);
app.use("/api/v2/school", SchoolRouter);
app.use("/api/v3/student", StudentRouter);
app.use("/api/v4/coordinator", CoordinatorRouter);
app.use("/api/v5/admin", AdminRouter);

dbConnection();

app.use(errorMiddleWare)
