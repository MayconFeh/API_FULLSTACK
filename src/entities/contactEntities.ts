import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
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

  @CreateDateColumn({ type: "date", default: () => "CURRENT_TIMESTAMP" })
  registration_date: string;

  @DeleteDateColumn({ type: "date" })
  delete_date: string | null;

  @ManyToOne(() => User, (user) => user.contacts, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;
}

export default Contact;
