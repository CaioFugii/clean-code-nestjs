import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { CreateDeliveryMethodUseCase } from '../../@core/delivery-method/application/use-cases/create-delivery-method.use-case';
import { ListDeliveryMethodsUseCase } from '../../@core/delivery-method/application/use-cases/list-delivery-methods.use-case';
import { DeliveryMethodRepositoryContract } from '../../@core/delivery-method/domain/repository/delivery-method.repository';
import { DeliveryMethodMongoDB } from '../../@core/delivery-method/infra/db/mongodb/delivery-method-mongodb.repository';
import { DeliveryMethodsController } from './delivery-methods.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'deliveryMethod',
        schema: DeliveryMethodMongoDB.DeliveryMethodSchema,
      },
    ]),
  ],
  controllers: [DeliveryMethodsController],
  providers: [
    {
      provide: 'DeliveryMethodMongodbRepository',
      useFactory: (
        deliveryMethodModel: typeof DeliveryMethodMongoDB.DeliveryMethodModel,
      ) => {
        return new DeliveryMethodMongoDB.DeliveryMethodRepository(
          deliveryMethodModel,
        );
      },
      inject: [getModelToken('deliveryMethod')],
    },
    {
      provide: CreateDeliveryMethodUseCase.UseCase,
      useFactory: (
        deliveryMethodRepo: DeliveryMethodRepositoryContract.Repository,
      ) => {
        return new CreateDeliveryMethodUseCase.UseCase(deliveryMethodRepo);
      },
      inject: ['DeliveryMethodMongodbRepository'],
    },
    {
      provide: ListDeliveryMethodsUseCase.UseCase,
      useFactory: (
        deliveryMethodRepo: DeliveryMethodRepositoryContract.Repository,
      ) => {
        return new ListDeliveryMethodsUseCase.UseCase(deliveryMethodRepo);
      },
      inject: ['DeliveryMethodMongodbRepository'],
    },
  ],
})
export class DeliveryMethodsModule {}
