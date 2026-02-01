import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, AfterUpdate, AfterRemove, AfterInsert, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  /** Hooks: */
  @AfterInsert()
  logInsert() {
    console.log('Inserted report with ID:', this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log('removed report with ID:', this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated report with ID:', this.id)
  }
}
