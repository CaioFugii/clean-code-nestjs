import { DeliveryMethod } from '../../../domain/entities/delivery-method';
import DeliveryMethodRepositoryContract from '../../../domain/repository/delivery-method.repository';
import { DeliveryMethodInMemoryRepository } from '../../../infra/db/in-memory/delivery-method-in-memory.repository';
import { ListDeliveryMethodsUseCase } from '../list-delivery-methods.use-case';

describe('ListDeliveryMethodsUseCase Unit Tests', () => {
  let useCase: ListDeliveryMethodsUseCase.UseCase;
  let repository: DeliveryMethodInMemoryRepository;

  beforeEach(() => {
    repository = new DeliveryMethodInMemoryRepository();
    useCase = new ListDeliveryMethodsUseCase.UseCase(repository);
  });

  test('toOutput method', () => {
    let result = new DeliveryMethodRepositoryContract.SearchResult({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_direction: null,
      filter: null,
    });
    let output = useCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    const entity = new DeliveryMethod({ name: 'EXPRESS' });
    result = new DeliveryMethodRepositoryContract.SearchResult({
      items: [entity],
      total: 1,
      current_page: 1,
      per_page: 2,
      sort: null,
      sort_direction: null,
      filter: null,
    });
    output = useCase['toOutput'](result);

    expect(output).toStrictEqual({
      items: [entity.toJSON()],
      total: 1,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });
  });

  it('should returns output using empty input with categories sort by created_at', async () => {
    const items = [
      new DeliveryMethod({ name: 'Test 1' }),
      new DeliveryMethod({
        name: 'Test 2',
        created_at: new Date(new Date().getTime() + 100),
      }),
    ];

    repository.items = items;

    const output = await useCase.execute({});

    expect(output).toStrictEqual({
      items: [...items].reverse().map(item => ({ ...item.toJSON() })),
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it('should returns output using pagination, sort and filter', async () => {
    const items = [
      new DeliveryMethod({ name: 'AAA' }),
      new DeliveryMethod({ name: 'Aaa' }),
      new DeliveryMethod({
        name: 'Bbbb',
        created_at: new Date(new Date().getTime() + 100),
      }),
      new DeliveryMethod({
        name: 'Ccc',
        created_at: new Date(new Date().getTime() + 200),
      }),
    ];

    repository.items = items;

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'name',
      filter: 'a',
    });

    expect(output).toStrictEqual({
      items: [items[0].toJSON(), items[1].toJSON()],
      total: 2,
      current_page: 1,
      per_page: 2,
      last_page: 1,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: 'created_at',
      sort_direction: 'desc',
    });

    expect(output).toStrictEqual({
      items: [items[3].toJSON(), items[2].toJSON()],
      total: 4,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
