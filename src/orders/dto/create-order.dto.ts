import { Type } from "class-transformer";
import { ValidateNested, IsArray } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { OrderedProductsDto } from "./ordered.products.dto";
import { CreateShippingDto } from "./creat-shipping.dto";

export class CreateOrderDto {
    @ApiProperty({ type: CreateShippingDto, description: "Shipping address details" })
    @Type(() => CreateShippingDto)
    @ValidateNested()
    shippingAddress: CreateShippingDto;

    @ApiProperty({
        type: [OrderedProductsDto], // Correct type
        description: "List of ordered products",
        isArray: true
    })
    @IsArray()
    @Type(() => OrderedProductsDto) // Correct DTO mapping
    @ValidateNested({ each: true })
    orderedProducts: OrderedProductsDto[];
}