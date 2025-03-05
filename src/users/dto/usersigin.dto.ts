import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "../enum/user-roles.enum";

export class UserSiginDto{

  @ApiProperty({ example: "johndoe@example.com", description: "User's email address" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "SecurePassword123!", description: "User's password" })
  @IsNotEmpty()
  @IsString()
  password: string;

}
