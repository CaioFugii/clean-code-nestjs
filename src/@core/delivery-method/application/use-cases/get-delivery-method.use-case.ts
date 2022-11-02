import UseCase from '../../../commons/application/use-case';
import { DeliveryMethodRepositoryContract } from '../../domain/repository/delivery-method.repository';
import {
  DeliveryMethodOutput,
  DeliveryMethodOutputMapper,
} from '../dto/delivery-method-output.dto';

export type Input = {
  id: string;
};

export type Output = DeliveryMethodOutput;

export default class GetDeliveryMethodUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private deliveryMethodRepo: DeliveryMethodRepositoryContract.Repository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.deliveryMethodRepo.findById(input.id);
    return DeliveryMethodOutputMapper.toOutput(entity);
  }
}
