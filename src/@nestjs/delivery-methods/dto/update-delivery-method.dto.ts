import { UpdateDeliveryMethodUseCase } from '../../../@core/delivery-method/application/use-cases/update-delivery-method.use-case';

export class UpdateDeliveryMethodDto
  implements UpdateDeliveryMethodUseCase.Input
{
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
}
