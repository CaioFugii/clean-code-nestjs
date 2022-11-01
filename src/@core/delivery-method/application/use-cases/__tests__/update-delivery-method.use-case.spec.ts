import NotFoundError from '../../../../commons/errors/not-found.error';
import { DeliveryMethod } from '../../../domain/entities/delivery-method';
import { DeliveryMethodInMemoryRepository } from '../../../infra/repository/in-memory/delivery-method-in-memory.repository';
import UpdateDeliveryMethodUseCase from '../update-delivery-method.use-case';

describe('UpdateDeliveryMethodUseCase Unit Tests', () => {
  let useCase: UpdateDeliveryMethodUseCase;
  let repository: DeliveryMethodInMemoryRepository;

  beforeEach(() => {
    repository = new DeliveryMethodInMemoryRepository();
    useCase = new UpdateDeliveryMethodUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');

    expect(() => useCase.execute({ id: 'fake', name: 'test' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake`),
    );
    expect(spyFindById).toHaveBeenCalled();
  });

  it('should update a category', async () => {
    const spyUpdate = jest.spyOn(repository, 'update');

    const items = [
      new DeliveryMethod({
        name: 'Cartoon',
        description: 'Some description',
      }),
    ];
    repository.items = items;

    let output = await useCase.execute({
      id: repository.items[0].id,
      name: 'EXPRESS',
      description: 'Other Description',
    });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'EXPRESS',
      description: 'Other Description',
      is_active: true,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(1);

    output = await useCase.execute({
      id: repository.items[0].id,
      name: 'NORMAL',
      description: 'Some description',
      is_active: false,
    });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'NORMAL',
      description: 'Some description',
      is_active: false,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(2);

    output = await useCase.execute({
      id: repository.items[0].id,
      name: 'CORREIOS',
      is_active: true,
    });
    expect(output).toStrictEqual({
      id: repository.items[0].id,
      name: 'CORREIOS',
      description: null,
      is_active: true,
      created_at: repository.items[0].created_at,
      updated_at: repository.items[0].updated_at,
    });
    expect(spyUpdate).toHaveBeenCalledTimes(3);
  });
});
