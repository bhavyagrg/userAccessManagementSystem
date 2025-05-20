import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AccessRequest } from "./AccessRequest";
import { USER_ROLES } from "../constants/user";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ type: "enum", enum: USER_ROLES, default: USER_ROLES.Employee })
  role!: USER_ROLES;

  @OneToMany(() => AccessRequest, (request) => request.user)
  requests!: AccessRequest[];
}
