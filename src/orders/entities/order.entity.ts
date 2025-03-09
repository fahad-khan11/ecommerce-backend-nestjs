import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { OrderStatus } from "../enum/order.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { ShippingEntity } from "./Shipping.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    orderAt : Timestamp

    @Column({type:'enum',enum:OrderStatus,default:OrderStatus.PROCESSING})
    status: string

    @Column({nullable:true})
    shippedAt : Date;

    @Column({nullable:true})
    deliveredAt : Date

    @ManyToOne(()=>UserEntity,(user)=>user.ordersUpdatedBy)
    updatedBy : UserEntity

    @OneToOne(()=>ShippingEntity,(ship)=>ship.order)
    @JoinColumn()
    shippingAdress : ShippingEntity
}
