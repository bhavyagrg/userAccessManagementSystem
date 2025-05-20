import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Software } from "./Software";
import { Status } from "../constants/Status";

@Entity()
export class AccessRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.requests)
  user!: User;

  @ManyToOne(() => Software, (software) => software.requests)
  software!: Software;

  @Column()
  accessType!: "Read" | "Write" | "Admin";

  @Column("text")
  reason!: string;

  @Column({ type: "enum", enum: Status, default: Status.Pending })
  status!: Status;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
