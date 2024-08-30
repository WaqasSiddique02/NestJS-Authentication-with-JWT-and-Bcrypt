import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class UsersDto{
    @IsString()
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
      })
    Name:string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
      })
    Email:string;
    
    @IsStrongPassword()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The strong password for the user account',
        example: 'Str0ngP@ssw0rd!',
        minLength: 8,
      })
    Password:string;
}