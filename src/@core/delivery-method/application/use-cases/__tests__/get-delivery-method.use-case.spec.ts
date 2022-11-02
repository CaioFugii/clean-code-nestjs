import { DeliveryMethod } from '../../../domain/entities/delivery-method';
import { DeliveryMethodInMemoryRepository } from '../../../infra/db/repository/in-memory/delivery-method-in-memory.repository';
import GetDeliveryMethodUseCase from '../get-delivery-method.use-case';

describe('GetDeliveryMethodUseCase Unit Tests', () => {
  let useCase: GetDeliveryMethodUseCase;
  let repository: DeliveryMethodInMemoryRepository;

  beforeEach(() => {
    repository = new DeliveryMethodInMemoryRepository();
    useCase = new GetDeliveryMethodUseCase(repository);
  });

  it('should throw an error, when pass a fake ID', async () => {
    expect(
      async () => await useCase.execute({ id: 'fake-id' }),
    ).rejects.toThrow('Entity Not Found using ID fake-id');
  });

  it('should return a delivery method', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new DeliveryMethod({ name: 'EXPRESS' })];
    repository.items = items;

    const output = await useCase.execute({ id: items[0].id });
    expect(output).toStrictEqual({
      id: items[0].id,
      name: 'EXPRESS',
      description: null,
      is_active: true,
      created_at: items[0].created_at,
      updated_at: items[0].updated_at,
    });
    expect(spyFindById).toBeCalledTimes(1);
  });
});
