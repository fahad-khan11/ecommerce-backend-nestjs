import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { RoleGuards } from 'src/auth/role.guards';
import { Roles } from 'src/decorators/Roles.decorator';
import { CategoryEntity } from './entities/category.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guards';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard,RoleGuards)
  @Roles('admin')
  create(@Body() createCategoryDto: CreateCategoryDto,@CurrentUser() currentUser :UserEntity):Promise<CategoryEntity>{
    return this.categoriesService.create(createCategoryDto,currentUser);
  }

  @Get()
  @UseGuards(JwtAuthGuard,RoleGuards)
  @Roles('admin')
  async findAll():Promise<CategoryEntity[]> {
    return await this.categoriesService.findAll();
  }

  @Get(':id') 
  @UseGuards(JwtAuthGuard,RoleGuards)
  @Roles('admin')
  async findOne(@Param('id') id: string):Promise<CategoryEntity> {
    return await this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard,RoleGuards)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,RoleGuards)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
