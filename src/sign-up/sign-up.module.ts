import { Module } from '@nestjs/common';
import { SignUpController } from './sign-up.controller';
import { SignUpService } from './sign-up.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // Replace with your secret key
      signOptions: { expiresIn: '30m' },
    }),
    TypeOrmModule.forFeature()],
  controllers: [SignUpController],
  providers: [SignUpService,JwtStrategy]
})
export class SignUpModule {}