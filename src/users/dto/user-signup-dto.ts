import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserSignupDto {

    @ApiProperty({ example: "John Doe", description: "User's full name" })
    @IsNotEmpty({message:'Name cannot be null'})
    @IsString({message:'Name should be string'})
    name : string

    @ApiProperty({ example: "johndoe@example.com", description: "User's email address" })
    @IsNotEmpty({message:'Name cannot be null'})
    @IsEmail({},{message:'plz provide a valid email'})
    email:string

    @ApiProperty({ example: "SecurePassword123!", description: "User's password" })
    @IsNotEmpty({message:'password cannot be null'})
    @MinLength(5,{message:'must must be min should be 5'})
    password : string
}