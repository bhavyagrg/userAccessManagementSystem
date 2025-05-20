import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Software } from "../entities/Software";
import { AccessRequest } from "../entities/AccessRequest";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "bhavya_dev",
  password: "bhavya_dev_pass",
  database: "user_access_system",
  synchronize: true, // Auto-create tables in dev (disable in prod)
  logging: true,
  entities: [User, Software, AccessRequest],
});
