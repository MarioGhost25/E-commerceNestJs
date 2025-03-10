import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentModule } from './payment/payment.module';
import { AuthModule } from './auth/auth.module';
// import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [ProductModule, ShoppingCartModule, PaymentModule, AuthModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
