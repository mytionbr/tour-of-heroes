import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hero } from "./Hero";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Hero, hero => hero.user)
    heroes: Hero[]
}