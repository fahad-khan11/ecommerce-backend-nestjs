import { IsString, IsNumber, IsNotEmpty, IsEmail, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    
    @ApiProperty({ example: 'Awesome Product', description: 'Title of the product' })
    @IsString()
    @IsNotEmpty({ message: 'Title is required' })
    title: string;

    @ApiProperty({ example: 'This is an amazing product.', description: 'Description of the product' })
    @IsString()
    @IsNotEmpty({ message: 'Description is required' })
    description: string;

    @ApiProperty({ example: 99.99, description: 'Price of the product' })
    @IsNumber()
    @IsNotEmpty({ message: 'Price is required' })
    price: number;

    @ApiProperty({ example: 50, description: 'Stock available for the product' })
    @IsNumber()
    @IsNotEmpty({ message: 'Stock is required' })
    stock: number;

    @ApiProperty({ 
        example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'], 
        description: 'Array of product image URLs', 
        isArray: true 
    })
    @IsArray()
    @ArrayNotEmpty({ message: 'At least one image is required' })
    @IsString({ each: true })
    images: string[];
    @ApiProperty({ example: 1, description: 'Category ID of the product' })
    @IsNumber()
    @IsNotEmpty({ message: 'Category is required' })
    categoryId: number;

}
