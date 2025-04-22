import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { joiValidationSchema } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joiValidationSchema,
    }),

    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    ShoppingCartModule,
    PaymentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
