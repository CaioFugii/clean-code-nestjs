import DefaultUseCase from '../../../commons/application/use-case';
import { DeliveryMethod } from '../../domain/entities/delivery-method';
import { DeliveryMethodRepository } from '../../domain/repository/delivery-method.repository';
import {
  DeliveryMethodOutput,
  DeliveryMethodOutputMapper,
} from '../dto/delivery-method-output.dto';

export namespace CreateDeliveryMethodUseCase {
  export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export type Output = DeliveryMethodOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private deliveryMethodRepo: DeliveryMethodRepository.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = new DeliveryMethod(input);
      await this.deliveryMethodRepo.insert(entity);
      return DeliveryMethodOutputMapper.toOutput(entity);
    }
  }
}
