import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm"
import { Report } from "../reports/report.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:  number;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column({ default: false })
    isAdmin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    /** Hooks: */
    @AfterInsert()
    logInsert() {
      console.log('Inserted user with ID:', this.id)
    }

    @AfterRemove()
    logRemove() {
      console.log('removed user with ID:', this.id)
    }


    @AfterUpdate()
    logUpdate() {
      console.log('Updated user with ID:', this.id)
    }
}