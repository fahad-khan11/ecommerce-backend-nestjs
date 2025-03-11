import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ShippingEntity } from './entities/Shipping.entity';
import { Timestamp } from 'firebase/firestore';




@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}


  async create(createOrderDto: CreateOrderDto, currentUser: UserEntity) {
    const shippingEntity = new ShippingEntity();
    Object.assign(shippingEntity, createOrderDto.shippingAddress);

    const orderEntity = new OrderEntity();
    orderEntity.shippingAdress = shippingEntity;
    orderEntity.user = currentUser;
    orderEntity.orderAt = new Date();
    orderEntity.status = 'processing';
    orderEntity.shippedAt = new Date();  
    orderEntity.deliveredAt = new Date();

    return await this.orderRepository.save(orderEntity);
  }

  async findAll() {
    return await this.orderRepository.find({ relations: ['shippingAdress', 'user'] });
  }

  async findOne(id: number) {
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['shippingAdress', 'user'],
    });
  }

  async update(id: number, updateData: Partial<OrderEntity>) {
    const order = await this.orderRepository.findOne({ where: { id } });
  
    if (!order) {
      throw new BadRequestException(`Order with ID ${id} not found`);
    }
  
    Object.assign(order, updateData); 
  
    await this.orderRepository.save(order); 
    return order; 
  }
  
  

  async remove(id: number) {
    const order = await this.findOne(id);
    if (!order) throw new BadRequestException(`Order with ID ${id} not found`);
    
    await this.orderRepository.delete(id);
    return { message: `Order ${id} deleted successfully` };
  }
}
