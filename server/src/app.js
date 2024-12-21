import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

// Root Route
app.get("/", (_req, res) => {
    res.json({ message: "Hello World!" });
});

// Routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1/users", userRoutes);

import performanceRoutes from "./routes/performance.routes.js";
app.use("/api/v1/performances", performanceRoutes);

import marketingMaterialRoutes from "./routes/marketingMaterial.routes.js";
app.use("/api/v1/materials", marketingMaterialRoutes);

import recommendationRoutes from "./routes/recommendation.routes.js";
app.use("/api/v1/recommendations", recommendationRoutes);

import productRoutes from "./routes/product.routes.js";
app.use("/api/v1/products", productRoutes);

import surveyRoutes from "./routes/survey.routes.js";
app.use("/api/v1/surveys", surveyRoutes);

import videoConferenceRoutes from "./routes/videoConference.routes.js";
app.use("/api/v1/videoConferences", videoConferenceRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

export { app };
