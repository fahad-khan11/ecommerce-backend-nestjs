import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Roles } from "../enum/user-roles.enum";
import { CategorEntity } from "src/categories/entities/category.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    email:string;

    @Column({select:false})
    password:string;

    @Column({type:'enum',enum:Roles, array:true, default:[Roles.USER]})
    roles:Roles[];

    @CreateDateColumn()
    createdAt : Timestamp;

    @UpdateDateColumn()
    updatedAt : Timestamp;

    @OneToMany(()=>CategorEntity,(category)=>category.addedBy)
    categories : CategorEntity[]
}
