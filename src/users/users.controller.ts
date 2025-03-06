import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignupDto } from './dto/user-signup-dto';
import { UserEntity } from './entities/user.entity';
import { UserSiginDto } from './dto/usersigin.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guards';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { RoleGuards } from 'src/auth/role.guards';
import { Roles } from 'src/decorators/Roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() signUpDto: UserSignupDto): Promise<{ user: UserEntity }> {
    return { user: await this.usersService.signup(signUpDto) };
  }

  @Post('signin')
  async signin(@Body() signDto:UserSiginDto):Promise<{user:UserEntity;token:string}>{
    return await this.usersService.signin(signDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard,RoleGuards)
  @Roles('user')
  @ApiBearerAuth()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('Profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@CurrentUser() currentUser : UserEntity){
    return currentUser
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getUserById(@Param('id') id:number){
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: UserSignupDto }) 
  async updateUser(@Param('id') id:number,@Body() updataData:Partial<UserSignupDto>){
    return this.usersService.updateUser(id,updataData)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async DeleteUser(@Param('id') id:number){
    return this.usersService.Delete(id)
  }
}
