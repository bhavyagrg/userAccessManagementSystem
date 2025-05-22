import express from "express";
const cors = require("cors");
import { AppDataSource } from "./config/data-source";
import { authRoutes } from "./routes/authRoutes";
import { healthRoutes } from "./routes/healthRoutes";
import { softwareRoutes } from "./routes/softwareRoutes";
import { requestsRoutes } from "./routes/requestsRoutes";

const app = express();
app.use(express.json());
app.use(cors());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source Initialized");

    app.use("/api/health", healthRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/software", softwareRoutes);
    app.use("/api/requests", requestsRoutes);

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error("Failed to initialize data source", err);
  });
