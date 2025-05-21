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
import { ACCESS_TYPE } from "../constants/user";

@Entity()
export class AccessRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.requests)
  user!: User;

  @ManyToOne(() => Software, (software) => software.requests)
  software!: Software;

  @Column({ type: "enum", enum: ACCESS_TYPE, default: ACCESS_TYPE.Read })
  accessType!: ACCESS_TYPE;

  @Column("text")
  reason!: string;

  @Column({ type: "enum", enum: Status, default: Status.Pending })
  status!: Status;

}
