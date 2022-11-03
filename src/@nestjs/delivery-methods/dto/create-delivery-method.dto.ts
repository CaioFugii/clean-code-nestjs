import { CreateDeliveryMethodUseCase } from '../../../@core/delivery-method/application/use-cases/create-delivery-method.use-case';

export class CreateDeliveryMethodDto
  implements CreateDeliveryMethodUseCase.Input
{
  name: string;
  description?: string;
  is_active?: boolean;
}
