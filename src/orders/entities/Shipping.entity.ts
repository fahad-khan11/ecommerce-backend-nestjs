import { OrderEntity } from "src/orders/entities/order.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('shippings')

export class ShippingEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    phone : string

    @Column({ default: ''})
    name:string

    @Column()
    address :string

    @Column()
    city : string

    @Column()
    postCode : string

    @Column()
    state : string

    @Column()
    country:string

    @OneToOne(()=>OrderEntity,(order)=>order.shippingAdress)
    order :OrderEntity

}
