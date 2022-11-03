import { DeliveryMethodInMemoryRepository } from '../../../infra/db/in-memory/delivery-method-in-memory.repository';
import { CreateDeliveryMethodUseCase } from '../create-delivery-method.use-case';

describe('CreateDeliveryMethodUseCase Unit Tests', () => {
  let useCase: CreateDeliveryMethodUseCase.UseCase;
  let repository: DeliveryMethodInMemoryRepository;

  beforeEach(() => {
    repository = new DeliveryMethodInMemoryRepository();
    useCase = new CreateDeliveryMethodUseCase.UseCase(repository);
  });

  it('should create a delivery method', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({ name: 'test' });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'test',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);

    output = await useCase.execute({
      name: 'test',
      description: 'test description',
      is_active: false,
    });
    expect(output).toStrictEqual({
      id: repository.items[1].id,
      name: 'test',
      description: 'test description',
      is_active: false,
      created_at: repository.items[1].created_at,
      updated_at: repository.items[1].updated_at,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
  });
});
