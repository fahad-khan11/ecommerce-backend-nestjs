import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsPositive, IsNotEmpty } from "class-validator";

export class OrderedProductsDto {
    @ApiProperty({ example: 1, description: "ID of the ordered product" })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ example: 19.99, description: "Unit price of the product" })
    @IsPositive()
    @IsNotEmpty()
    product_unit_price: number;

    @ApiProperty({ example: 2, description: "Quantity of the ordered product" })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    product_quantity: number;
}