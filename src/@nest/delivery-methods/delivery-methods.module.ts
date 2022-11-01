import { Module } from '@nestjs/common';
import { CreateDeliveryMethodUseCase } from '../../@core/delivery-method/application/use-cases/create-delivery-method.use-case';
import { ListDeliveryMethodsUseCase } from '../../@core/delivery-method/application/use-cases/list-delivery-methods.use-case';
import { DeliveryMethodRepository } from '../../@core/delivery-method/domain/repository/delivery-method.repository';
import { DeliveryMethodInMemoryRepository } from '../../@core/delivery-method/infra/repository/in-memory/delivery-method-in-memory.repository';
import { DeliveryMethodsController } from './delivery-methods.controller';

@Module({
  controllers: [DeliveryMethodsController],
  providers: [
    {
      provide: 'DeliveryMethodInMemoryRepository',
      useClass: DeliveryMethodInMemoryRepository, // substituir a qualquer momento para um repository real
    },
    {
      provide: CreateDeliveryMethodUseCase.UseCase,
      useFactory: (deliveryMethodRepo: DeliveryMethodRepository.Repository) => {
        return new CreateDeliveryMethodUseCase.UseCase(deliveryMethodRepo);
      },
      inject: ['DeliveryMethodInMemoryRepository'],
    },
    {
      provide: ListDeliveryMethodsUseCase.UseCase,
      useFactory: (deliveryMethodRepo: DeliveryMethodRepository.Repository) => {
        return new ListDeliveryMethodsUseCase.UseCase(deliveryMethodRepo);
      },
      inject: ['DeliveryMethodInMemoryRepository'],
    },
  ],
})
export class DeliveryMethodsModule {}
