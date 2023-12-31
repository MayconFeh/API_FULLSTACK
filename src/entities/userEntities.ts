import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Contact } from "./contactEntities";
@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  full_name: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  phone_number: string;

  @CreateDateColumn({ type: "date", default: () => "CURRENT_TIMESTAMP" })
  registration_date: string;

  @DeleteDateColumn({ type: "date" })
  delete_date: string | null;

  @OneToMany(() => Contact, (contact) => contact.user, { nullable: true })
  contacts: Contact[];

  @BeforeInsert()
  hashUserPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  @BeforeUpdate()
  hashPassword() {
    const isEncrypted: number = bcrypt.getRounds(this.password);
    if (!isEncrypted) {
      this.password = bcrypt.hashSync(this.password, 10);
    }
  }
}

export default User;
