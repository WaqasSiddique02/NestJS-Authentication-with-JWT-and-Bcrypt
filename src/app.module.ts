import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpModule } from './sign-up/sign-up.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
    type: 'mssql',
    host: 'localhost',
    port: 1433,
    username: 'waqas',
    password: 'Waqas@1234',
    database: 'customersDB',
    synchronize: false,
    extra: {
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    }
  }), SignUpModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
