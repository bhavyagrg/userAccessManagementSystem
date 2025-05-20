import express from "express";
import { AppDataSource } from "./config/data-source";
import {authRoutes} from "./routes/authRoutes";
import {healthRoutes} from "./routes/healthRoutes";
import {testRoutes} from "./routes/testRoutes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initialized");

    app.use("/api/health", healthRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/test", testRoutes);

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Failed to initialize data source", err);
  });
