import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./userEntities";

@Entity("contacts")
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  full_name: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  phone_number: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  registration_date: Date;

  @ManyToOne(() => User, (user) => user.contacts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}

export default Contact;
