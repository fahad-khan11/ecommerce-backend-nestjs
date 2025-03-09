import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity('reviews')
export class ReviewEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    ratings:string

    @Column()
    comment:string

    @CreateDateColumn()
    createdAt:Timestamp

    @UpdateDateColumn()
    updateAt:Timestamp

    @ManyToOne(type=>UserEntity,(user)=>user.reviews)
    user:UserEntity

    @ManyToOne(()=>ProductEntity,(prod)=>prod.reviews)
    product:ProductEntity

}
