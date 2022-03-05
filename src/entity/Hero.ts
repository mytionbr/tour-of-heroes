import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Hero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true
  })
  agency: string;

  @Column({
    nullable: true
  })
  category: string;

  @Column({
    nullable: true
  })
  about: string;

  @ManyToOne(type => User, user => user.heroes)
  user: User
}
