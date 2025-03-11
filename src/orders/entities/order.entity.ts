import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { OrderStatus } from "../enum/order.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { OrdersProductsEntity } from "./orders-products.entity";
import { ShippingEntity } from "./Shipping.entity";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    orderAt: Date;    

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PROCESSING })
    status: string;

    @Column({ nullable: true })
    shippedAt: Date;

    @Column({ nullable: true })
    deliveredAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.ordersUpdatedBy)
    updatedBy: UserEntity;

    @OneToOne(() => ShippingEntity, (ship) => ship.order,{cascade:true})
    @JoinColumn()
    shippingAdress: ShippingEntity;

    @OneToMany(() => OrdersProductsEntity, (op) => op.order, { cascade: true })
    products: OrdersProductsEntity[];

    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity;
}