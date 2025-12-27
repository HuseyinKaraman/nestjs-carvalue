import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn
} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:  number;

    @Column()
    email:string;

    @Column()
    password:string;

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