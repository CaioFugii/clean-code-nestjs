import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateDeliveryMethodUseCase } from '../../@core/delivery-method/application/use-cases/create-delivery-method.use-case';
import { GetDeliveryMethodUseCase } from '../../@core/delivery-method/application/use-cases/get-delivery-method.use-case';
import { ListDeliveryMethodsUseCase } from '../../@core/delivery-method/application/use-cases/list-delivery-methods.use-case';
import { UpdateDeliveryMethodUseCase } from '../../@core/delivery-method/application/use-cases/update-delivery-method.use-case';
import { CreateDeliveryMethodDto } from './dto/create-delivery-method.dto';
import { SearchDeliveryMethodDto } from './dto/search-delivery-method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery-method.dto';
import {
  DeliveryMethodCollectionPresenter,
  DeliveryMethodsPresenter,
} from './presenter/delivery-methods.presenter';

@Controller('delivery-methods')
export class DeliveryMethodsController {
  @Inject(CreateDeliveryMethodUseCase.UseCase)
  private createUseCase: CreateDeliveryMethodUseCase.UseCase;

  @Inject(GetDeliveryMethodUseCase.UseCase)
  private getUseCase: GetDeliveryMethodUseCase.UseCase;

  @Inject(ListDeliveryMethodsUseCase.UseCase)
  private listUseCase: ListDeliveryMethodsUseCase.UseCase;

  @Inject(UpdateDeliveryMethodUseCase.UseCase)
  private updateUseCase: UpdateDeliveryMethodUseCase.UseCase;

  @Post()
  async create(@Body() createDeliverymethod: CreateDeliveryMethodDto) {
    const output = await this.createUseCase.execute(createDeliverymethod);
    return new DeliveryMethodsPresenter(output);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const output = await this.getUseCase.execute({ id });
    return new DeliveryMethodsPresenter(output);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateDeliveryMethodDto,
  ) {
    const output = await this.updateUseCase.execute({
      id,
      ...updateCategoryDto,
    });
    return new DeliveryMethodsPresenter(output);
  }

  @Get()
  async search(@Query() searchParams: SearchDeliveryMethodDto) {
    const output = await this.listUseCase.execute(searchParams);
    return new DeliveryMethodCollectionPresenter(output);
  }
}
