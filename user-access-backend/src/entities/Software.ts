import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { AccessRequest } from "./AccessRequest";

@Entity()
export class Software {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text")
  description!: string;

  @Column("simple-array")
  accessLevels!: string[]; // e.g., ["Read", "Write", "Admin"]

  @OneToMany(() => AccessRequest, (request) => request.software)
  requests!: AccessRequest[];
}
