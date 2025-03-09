import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateReviewDto {

    @ApiProperty({
        description: 'ID of the product being reviewed',
        type: Number,
        example: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    productId: number;

    @ApiProperty({
        description: 'Rating given for the product (e.g., 1-5)',
        type: String,
        example: '5',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(5) 
    ratings: string;

    @ApiProperty({
        description: 'Comment about the product',
        type: String,
        example: 'Great product!',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(500) 
    comment: string;
}
