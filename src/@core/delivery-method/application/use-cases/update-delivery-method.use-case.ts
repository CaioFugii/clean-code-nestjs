import DefaultUseCase from '../../../commons/application/use-case';
import { DeliveryMethodRepositoryContract } from '../../domain/repository/delivery-method.repository';
import {
  DeliveryMethodOutput,
  DeliveryMethodOutputMapper,
} from '../dto/delivery-method-output.dto';

export namespace UpdateDeliveryMethodUseCase {
  export type Input = {
    id: string;
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export type Output = DeliveryMethodOutput;
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private deliveryMethodRepo: DeliveryMethodRepositoryContract.Repository,
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
}
