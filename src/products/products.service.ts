import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { UserEntity } from 'src/users/entities/user.entity';
import dataSource from 'db/data-source';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoriesService
  ) {}

  async create(createProductDto: CreateProductDto, currentUser: UserEntity): Promise<ProductEntity> {
    const category = await this.categoryService.findOne(+createProductDto.categoryId);
    const product = this.productRepository.create(createProductDto);
    product.category = category;
    product.addedBy = currentUser;
    return await this.productRepository.save(product);
  }

  async findAll(query: any): Promise<any> {
    let filteredTotalProducts: number;
    let limit: number = query.limit ? parseInt(query.limit) : 4;

    const queryBuilder = dataSource.getRepository(ProductEntity)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoin('product.reviews', 'review')
      .addSelect([
        'COUNT(review.id) as reviewCount',
        'AVG(CAST(review.ratings AS NUMERIC(10,2))) as avgRating'
      ])
      .groupBy('product.id, category.id');

    if (query.search) {
      const search = query.search;
      queryBuilder.andWhere("product.title LIKE :title", { title: `%${search}%` });
    }

    if (query.category) {
      queryBuilder.andWhere("category.id = :id", { id: query.category });
    }

    if (query.minPrice) {
      queryBuilder.andWhere("product.price >= :minPrice", { minPrice: query.minPrice });
    }

    if (query.maxPrice) {
      queryBuilder.andWhere("product.price <= :maxPrice", { maxPrice: query.maxPrice });
    }

    if (query.minRating) {
      queryBuilder.andHaving("AVG(review.ratings) >= :minRating", { minRating: query.minRating });
    }

    if (query.maxRating) {
      queryBuilder.andHaving("AVG(review.ratings) <= :maxRating", { maxRating: query.maxRating });
    }

    if (query.offset) {
      queryBuilder.skip(parseInt(query.offset));
    }

    queryBuilder.take(limit);

    // Fetch total count AFTER applying filters
    const totalProducts = await queryBuilder.getCount();
    
    const products = await queryBuilder.getRawMany();

    return products;
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: Partial<UpdateProductDto>): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException(`Product with ID ${id} not found`);
    }
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new BadRequestException(`Product with ID ${id} not found`);
    }

    await this.productRepository.remove(product);
    return { message: "Product deleted successfully" };
  }
}
