import { DeliveryMethod } from '../../domain/entities/delivery-method';

export type DeliveryMethodOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export class DeliveryMethodOutputMapper {
  static toOutput(entity: DeliveryMethod): DeliveryMethodOutput {
    return entity.toJSON();
  }
}
