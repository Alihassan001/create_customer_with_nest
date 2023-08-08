import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersController, AuthController, CustomersController } from './controllers';
import { UserService, AuthService, CustomersService } from './services';
import { User, Customer } from './db/entities';
import { JwtStrategy } from './utils/auth';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Testing@123',
      database: 'random_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Customer]),
    PassportModule,
    JwtModule.register({
      secret: 'wkjfsjfsalfjsdoiafsajfdos', // Replace this with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  controllers: [UsersController, AuthController, CustomersController],
  providers: [UserService, AuthService, CustomersService, JwtStrategy],
})
export class AppModule {}
