import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule  {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes('*');
  // }
}
