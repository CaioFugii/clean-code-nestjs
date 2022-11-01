import UseCase from '../../../commons/application/use-case';
import { DeliveryMethodRepository } from '../../domain/repository/delivery-method.repository';
import {
  DeliveryMethodOutput,
  DeliveryMethodOutputMapper,
} from '../dto/delivery-method-output.dto';

export type Input = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
};

export type Output = DeliveryMethodOutput;

export default class UpdateDeliveryMethodUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private deliveryMethodRepo: DeliveryMethodRepository.Repository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.deliveryMethodRepo.findById(input.id);

    entity.update(input.name, input.description);

    if (input.is_active === true) {
      entity.activate();
    }

    if (input.is_active === false) {
      entity.deactivate();
    }

    await this.deliveryMethodRepo.update(entity);

    return DeliveryMethodOutputMapper.toOutput(entity);
  }
}
