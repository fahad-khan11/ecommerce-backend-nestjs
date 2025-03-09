import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository:Repository<ProductEntity>,
  private readonly categoryService: CategoriesService
){}
  async create(createProductDto: CreateProductDto,currentUser:UserEntity) :Promise<ProductEntity>{
    const category = await this.categoryService.findOne(+createProductDto.categoryId)
    const product =this.productRepository.create(createProductDto)
    product.category = category;
    product.addedBy = currentUser;
    return await this.productRepository.save(product)
  }

  async findAll():Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
        throw new BadRequestException(`Product with ID ${id} not found`);
    }
    return product;
}
  async update(id: number, updateProductDto:Partial<UpdateProductDto>):Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
        throw new BadRequestException(`Product with ID ${id} not found`);
    }
    Object.assign(product,updateProductDto)
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
        throw new BadRequestException(`Product with ID ${id} not found`);
    }
    
    await this.productRepository.remove(product)
    return {message:"category deleted successfully"};
  }
}
