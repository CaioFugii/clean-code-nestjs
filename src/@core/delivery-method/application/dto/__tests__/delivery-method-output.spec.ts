import { DeliveryMethod } from '../../../domain/entities/delivery-method';
import { DeliveryMethodOutputMapper } from '../delivery-method-output.dto';

describe('DeliveryMethodOutputMapper Unit Tests', () => {
  it('should convert a delivery method in output', () => {
    const created_at = new Date();
    const updated_at = new Date();

    const entity = new DeliveryMethod({
      name: 'EXPRESS',
      description: 'some description',
      is_active: true,
      created_at,
      updated_at,
    });
    const spyToJSON = jest.spyOn(entity, 'toJSON');
    const output = DeliveryMethodOutputMapper.toOutput(entity);
    expect(spyToJSON).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id,
      name: 'EXPRESS',
      description: 'some description',
      is_active: true,
      created_at,
      updated_at,
    });
  });
});
