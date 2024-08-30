import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { UsersDto } from 'src/DTO/user.dto';
import { JwtAuthGuard } from './jwt/jwt.authguard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('sign-up')
@ApiTags('UserAuthentication')
export class SignUpController {
    constructor(private readonly signUpService:SignUpService ){}

    @ApiBody({
        description:"Add login details",
    })
    @Post('auth/login')
    async login(@Body() body) {
      const user = await this.signUpService.validateUser(body.username, body.password);
      if (!user) {
        return { message: 'Invalid credentials' };
      }
      return this.signUpService.login(user);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('getAll')
    getData():Promise<string>{
        return this.signUpService.getData();
    }

    @Post('insert')
    createuser(@Body() user:UsersDto):Promise<string>{
        return this.signUpService.createUser(user);
    }
    
    @Get('getOne/:CustomerID')
    getOne(@Param('CustomerID') CustomerID: number): Promise<string> {
        return this.signUpService.getOne(CustomerID);
    }
}
