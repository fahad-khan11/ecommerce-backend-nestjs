import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity({name:'categories'})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    description:string

    @CreateDateColumn({ type: "timestamp" }) 
    createAt:Timestamp

    @UpdateDateColumn({ type: "timestamp" }) 
    updatedAt:Timestamp

    @ManyToOne(()=> UserEntity,(user)=>user.categories)
    addedBy:UserEntity;

    @OneToMany(()=>ProductEntity,(prod)=>prod.category)
    products : ProductEntity[]

}
