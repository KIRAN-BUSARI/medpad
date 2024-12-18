import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { uploadProcessData } from "./firebase.js";
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (_req, res) => {
    res.json({ message: "Hello World!" });
});

app.get("/upload", async (_req, res) => {
    await uploadProcessData();
    res.json({ message: "success" });
});

import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes)

export { app };