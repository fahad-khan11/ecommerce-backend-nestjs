import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'categories'})
export class CategorEntity {
    @PrimaryColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @CreateDateColumn({ type: "timestamp" }) 
    createAt:Timestamp

    @CreateDateColumn({ type: "timestamp" }) 
    updatedAt:Timestamp

    @ManyToOne(()=> UserEntity,(user)=>user.categories)
    addedBy:UserEntity;

}
