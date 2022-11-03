import { Transform } from 'class-transformer';
import { DeliveryMethodOutput } from '../../../@core/delivery-method/application/dto/delivery-method-output.dto';
import { ListDeliveryMethodsUseCase } from '../../../@core/delivery-method/application/use-cases/list-delivery-methods.use-case';
import { CollectionPresenter } from '../../commons/presenters/collection.presenter';

export class DeliveryMethodsPresenter {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  @Transform(({ value }) => value.toISOString())
  created_at: Date;
  updated_at: Date;

  constructor(output: DeliveryMethodOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.is_active = output.is_active;
    this.created_at = output.created_at;
    this.updated_at = output.updated_at;
  }
}

export class DeliveryMethodCollectionPresenter extends CollectionPresenter {
  data: DeliveryMethodsPresenter[];

  constructor(output: ListDeliveryMethodsUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map(item => new DeliveryMethodsPresenter(item));
  }
}
