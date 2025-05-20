import { AppDataSource } from "./config/data-source";
import "reflect-metadata";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
    // Start Express server here
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
