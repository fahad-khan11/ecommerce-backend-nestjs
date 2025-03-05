import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-signup-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserSiginDto } from './dto/usersigin.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private userRepository:Repository<UserEntity>,
  private jwtService :JwtService,
   ){}

   async signup(signupDto:UserSignupDto){
    const {name,email,password} = signupDto;
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException("User already exists");
    }
    const hashPassword = await bcrypt.hash(password,10);
    const signupUser = this.userRepository.create({
      name :signupDto.name,
      email :signupDto.email,
      password:hashPassword,
    });
    return await this.userRepository.save(signupUser)
   }

   async signin(signinDto:UserSiginDto){
    const {email,password} = signinDto
    const user = await this.userRepository.findOne({ where: { email },select: ['id', 'email', 'password'], });
    if (!user) {
      throw new BadRequestException("User not exists");
    }
    if (!user.password) {
      throw new BadRequestException("User password is missing in the database");
    }

    const isPasswordvalid =await bcrypt.compare(password,user.password)
    if(!isPasswordvalid){
      throw new BadRequestException('Invalid password try again')
    }

    const payload = {email:user.email,id:user.id}
    const token = this.jwtService.sign(payload)

    return {user,token}
   }

   async getAllUsers() {
    return await this.userRepository.find();
  }
  
   async getUserById(id: number | string): Promise<UserEntity | null> {
    const numericId = typeof id === 'number' ? id : parseInt(id);
    if (isNaN(numericId)) {
      console.error('Invalid user id:', id);
      throw new BadRequestException("Invalid user id provided");
    }
    const user = await this.userRepository.findOne({ where: { id: numericId } });
    if(!user){
      throw new BadRequestException("User not found")
    }
    return user
   }

   async updateUser(id:number ,updateData:Partial<UserSignupDto>){

    const user = await this.userRepository.findOne({where : {id}})
    if(!user){
      throw new BadRequestException("user not found")
    }
    Object.assign(user,updateData)
    return this.userRepository.save(user);
   }

   async Delete(id:number){
    const user = await this.userRepository.findOne({where:{id}})
    if(!user){
      throw new BadRequestException("user not found")
    }
    await this.userRepository.remove(user)
    return { message: "User deleted successfully" };

   }
}
