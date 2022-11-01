import { Module } from '@nestjs/common';
import { DeliveryMethodsModule } from './@nest/delivery-methods/delivery-methods.module';

@Module({
  imports: [DeliveryMethodsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
