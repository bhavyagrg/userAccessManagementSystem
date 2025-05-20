import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AccessRequest } from "./AccessRequest";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: "Employee" | "Manager" | "Admin";

  @OneToMany(() => AccessRequest, (request) => request.user)
  requests!: AccessRequest[];
}
