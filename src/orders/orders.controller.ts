import { 
  Controller, Get, Post, Body, Param, Delete, Patch, UseGuards 
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guards';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { ApiBody, ApiOperation } from '@nestjs/swagger';


@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() currentUser: UserEntity) {
    return this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ordersService.findOne(id);
  }

@Patch(':id')
@ApiOperation({ summary: 'Update an order by ID' })
@ApiBody({
  description: 'Fields to update in the order',
  type: OrderEntity,
  examples: {
    example1: {
      summary: 'Update Order Status',
      value: {
        "status": "shipped",
        "shippedAt": "2025-03-10T12:30:00.000Z"
      }
    },
    example2: {
      summary: 'Update Delivery Date',
      value: {
        "deliveredAt": "2025-03-11T15:00:00.000Z"
      }
    }
  }
})
update(@Param('id') id: number, @Body() updateData: Partial<OrderEntity>) {
  return this.ordersService.update(id, updateData);
}


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ordersService.remove(id);
  }
}
