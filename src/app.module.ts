import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeliveryMethodsModule } from './@nest/delivery-methods/delivery-methods.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb:27017/studies', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    DeliveryMethodsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
