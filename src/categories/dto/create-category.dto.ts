import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({
    description: "The title of the category",
    example: "Electronics",
  })
  @IsNotEmpty({ message: "title cannot be null" })
  @IsString({ message: "title should be string" })
  title: string;

  @ApiProperty({
    description: "A brief description of the category",
    example: "This category contains all electronic items",
  })
  @IsNotEmpty({ message: "description cannot be null" })
  @IsString({ message: "description should be string" })
  description: string;
}
