import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersDto } from 'src/DTO/user.dto';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {
    constructor(private readonly connection:Connection,private readonly jwtService:JwtService){}

    async validateUser(username: string, pass: string): Promise<any> {
        // Query the user by username from the database
        const user = await this.connection.query(
            `SELECT * FROM Customers WHERE Name = '${username}'`
        );

        // Check if user exists and if the provided password matches the stored hashed password
        if (user.length && await bcrypt.compare(pass, user[0].Password)) {
            const { Password, ...result } = user[0];
            return result;
        }
        return null;
    }
    
    async login(user: any) {
        const payload = { username: user.Name, sub: user.CustomerID };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

   async getData():Promise<string>{
        const result = await this.connection.query(`SELECT * FROM Customers`);
        return result;
    }

    async createUser(user: UsersDto): Promise<string> {
        const hashedPassword = await bcrypt.hash(user.Password, 10); // Added bcrypt hash for password

        await this.connection.query(
            `INSERT INTO Customers(Name, Email, Password) values('${user.Name}', '${user.Email}', '${hashedPassword}')`
        );
        return this.getData();
    }

    async getOne(CustomerID):Promise<string>{
        const result = await this.connection.query(`SELECT Name ,Password FROM Customers WHERE CustomerID=${CustomerID}`);
        return result;
    }
}
