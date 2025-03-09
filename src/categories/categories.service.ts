import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoryRepository:Repository<CategoryEntity> ){}

  async create(createCategoryDto: CreateCategoryDto,currentUser:UserEntity):Promise<CategoryEntity> {
    const category = this.categoryRepository.create(createCategoryDto)
    category.addedBy = currentUser
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find() ;
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
       where: { id },
       relations:{addedBy:true},
       select : {
        addedBy:{
          id:true,
          name:true,
          email:true
        }
       }
  });
  
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  
    return category;
  }

  async update(id: number, fields:Partial<UpdateCategoryDto> ) {
    const category = await this.findOne(id)
    if(!category) throw new NotFoundException('category not found')
      Object.assign(category,fields)
    return await this.categoryRepository.save(category)
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
  
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  
   await this.categoryRepository.remove(category);
   return { message: "category deleted successfully" };
  }
}
