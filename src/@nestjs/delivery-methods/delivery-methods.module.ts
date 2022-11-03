import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { CreateDeliveryMethodUseCase } from '../../@core/delivery-method/application/use-cases/create-delivery-method.use-case';
import { GetDeliveryMethodUseCase } from '../../@core/delivery-method/application/use-cases/get-delivery-method.use-case';
import { ListDeliveryMethodsUseCase } from '../../@core/delivery-method/application/use-cases/list-delivery-methods.use-case';
import { UpdateDeliveryMethodUseCase } from '../../@core/delivery-method/application/use-cases/update-delivery-method.use-case';
import { DeliveryMethodRepositoryContract } from '../../@core/delivery-method/domain/repository/delivery-method.repository';
import { DeliveryMethodMongoDB } from '../../@core/delivery-method/infra/db/mongodb/delivery-method-mongodb.repository';
import { DeliveryMethodsController } from './delivery-methods.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DeliveryMethodMongoDB.DeliveryMethodModel.name,
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
      inject: [getModelToken(DeliveryMethodMongoDB.DeliveryMethodModel.name)],
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
      provide: GetDeliveryMethodUseCase.UseCase,
      useFactory: (
        deliveryMethodRepo: DeliveryMethodRepositoryContract.Repository,
      ) => {
        return new GetDeliveryMethodUseCase.UseCase(deliveryMethodRepo);
      },
      inject: ['DeliveryMethodMongodbRepository'],
    },
    {
      provide: UpdateDeliveryMethodUseCase.UseCase,
      useFactory: (
        deliveryMethodRepo: DeliveryMethodRepositoryContract.Repository,
      ) => {
        return new UpdateDeliveryMethodUseCase.UseCase(deliveryMethodRepo);
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
