import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsPostalCode, Length } from "class-validator";

export class CreateShippingDto {
    @ApiProperty({ example: "1234567890", description: "Phone number of the recipient" })
    @IsString()
    @IsNotEmpty()
    @Length(10, 15) 
    phone: string;

    @ApiProperty({ example: "John Doe", description: "Full name of the recipient" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: "123 Main Street", description: "Street address of the recipient" })
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty({ example: "New York", description: "City of the recipient" })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ example: "10001", description: "Postal code of the recipient" })
    @IsPostalCode("any") 
    @IsNotEmpty()
    postCode: string; 

    @ApiProperty({ example: "New York", description: "State or province of the recipient" })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ example: "USA", description: "Country of the recipient" })
    @IsString()
    @IsNotEmpty()
    country: string;
}
