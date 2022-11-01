import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateDeliveryMethodUseCase } from '../../@core/delivery-method/application/use-cases/create-delivery-method.use-case';
import { ListDeliveryMethodsUseCase } from '../../@core/delivery-method/application/use-cases/list-delivery-methods.use-case';
import { CreateDeliveryMethodDto } from './dto/create-delivery-method.dto';

@Controller('delivery-methods')
export class DeliveryMethodsController {
  @Inject(CreateDeliveryMethodUseCase.UseCase)
  private createUseCase: CreateDeliveryMethodUseCase.UseCase;

  @Inject(ListDeliveryMethodsUseCase.UseCase)
  private listUseCase: ListDeliveryMethodsUseCase.UseCase;

  @Post()
  create(@Body() createDeliverymethod: CreateDeliveryMethodDto) {
    return this.createUseCase.execute(createDeliverymethod);
  }

  @Get()
  findAll() {
    return this.listUseCase.execute({});
  }
}
