import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guards';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ReviewEntity } from './entities/review.entity';
import { RoleGuards } from 'src/auth/role.guards';
import { Roles } from 'src/decorators/Roles.decorator';

@ApiBearerAuth()
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService,) {}
  @UseGuards(JwtAuthGuard)
  @Post()
 async create(@Body() createReviewDto: CreateReviewDto,@CurrentUser() currentUser :UserEntity) {
    return await this.reviewsService.create(createReviewDto,currentUser);
  }

  @Get()
  findAll():Promise<ReviewEntity[]> {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<ReviewEntity> {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,RoleGuards)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
