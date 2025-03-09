import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(ReviewEntity) private readonly reviewRepository:Repository<ReviewEntity>,
  private readonly productService:ProductsService
){}
async create(createReviewDto: CreateReviewDto, currentUser: UserEntity): Promise<ReviewEntity> {
  const product = await this.productService.findOne(+createReviewDto.productId);

  if (!product) {
    throw new Error(`Product with ID ${createReviewDto.productId} not found`);
  }

  const review = this.reviewRepository.create({
    ratings: createReviewDto.ratings,
    comment: createReviewDto.comment,
    user: currentUser,   
    product: product,   
  });

  return await this.reviewRepository.save(review);
}

async findAll(): Promise<ReviewEntity[]> {
  return await this.reviewRepository.find({
    relations: ['user', 'product'], 
  });
}

  async findOne(id: number):Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({
      where : {id},
      relations:{
        user:true,
        product:{
          category:true
        }
      }
    })
    if(!review) throw new BadRequestException("review not found")
      return review;
  }

  async update(id: number, updateReviewDto: Partial<UpdateReviewDto>):Promise<ReviewEntity> {
    const review = await this.reviewRepository.findOne({where : {id}})
    if(!review){
      throw new BadRequestException("Review not found")
    }
    Object.assign(review,updateReviewDto)
    return review
  }

  async remove(id: number) {
    await this.reviewRepository.delete(id);
    return "review deleted succesfully";
  }
}
