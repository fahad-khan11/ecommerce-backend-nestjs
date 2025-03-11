import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guards';
import { RoleGuards } from 'src/auth/role.guards';
import { Roles } from 'src/decorators/Roles.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ProductEntity } from './entities/product.entity';
import { query } from 'express';
import { LoggingInterceptor } from 'src/Interceptor/first.interceptor';

@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard,RoleGuards)
  @Roles('user')
  @Post()
  async create(@Body() createProductDto: CreateProductDto,@CurrentUser() currentUser:UserEntity):Promise<ProductEntity> {
    return await this.productsService.create(createProductDto,currentUser);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  findAll(@Query() query:any):Promise<any> {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<any> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
