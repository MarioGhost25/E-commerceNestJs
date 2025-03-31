import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { envConfig, joiValidationSchema } from './config';



@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ envConfig ],
      validationSchema: joiValidationSchema,
    }),
    ProductModule,
    ShoppingCartModule,
    PaymentModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
