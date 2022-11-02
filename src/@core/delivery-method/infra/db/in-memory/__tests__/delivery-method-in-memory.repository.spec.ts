import { DeliveryMethod } from '../../../../domain/entities/delivery-method';
import { DeliveryMethodInMemoryRepository } from '../delivery-method-in-memory.repository';

describe('CategoryInMemoryRepository Unit Tests', () => {
  let repository: DeliveryMethodInMemoryRepository;

  beforeEach(() => (repository = new DeliveryMethodInMemoryRepository()));

  describe('applyFilter method', () => {
    it('should no filter items when filter param is null', async () => {
      const items = [new DeliveryMethod({ name: 'test' })];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      const itemsFiltered = await repository['applyFilter'](items, null);

      expect(itemsFiltered).toStrictEqual(items);
      expect(spyFilterMethod).not.toHaveBeenCalled();
    });

    it('should filter items using a filter param', async () => {
      const items = [
        new DeliveryMethod({ name: 'test' }),
        new DeliveryMethod({ name: 'TEST' }),
        new DeliveryMethod({ name: 'fake' }),
      ];
      const spyFilterMethod = jest.spyOn(items, 'filter' as any);
      let itemsFiltered = await repository['applyFilter'](items, 'TEST');

      expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
      expect(spyFilterMethod).toHaveBeenCalledTimes(1);

      itemsFiltered = await repository['applyFilter'](items, 'no-filter');

      expect(itemsFiltered).toHaveLength(0);
      expect(spyFilterMethod).toHaveBeenCalledTimes(2);
    });
  });
  describe('applySort method', () => {
    it('should sort items by created_at when sort param is null', async () => {
      const created_at = new Date();
      const items = [
        new DeliveryMethod({ name: 'test', created_at }),
        new DeliveryMethod({
          name: 'TEST',
          created_at: new Date(created_at.getTime() + 100),
        }),
        new DeliveryMethod({
          name: 'fake',
          created_at: new Date(created_at.getTime() + 200),
        }),
      ];

      let itemsSorted = await repository['applySort'](items, null, null);

      expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
    });

    it('should sort items by name', async () => {
      const items = [
        new DeliveryMethod({ name: 'c' }),
        new DeliveryMethod({ name: 'b' }),
        new DeliveryMethod({ name: 'a' }),
      ];

      let itemsSorted = await repository['applySort'](items, 'name', 'asc');

      expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

      itemsSorted = await repository['applySort'](items, 'name', 'desc');
      expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
    });
  });
  describe('applyPaginate method', () => {
    it('should paginate items', async () => {
      const items = [
        new DeliveryMethod({ name: 'a' }),
        new DeliveryMethod({ name: 'b' }),
        new DeliveryMethod({ name: 'c' }),
        new DeliveryMethod({ name: 'd' }),
        new DeliveryMethod({ name: 'e' }),
      ];

      let itemsPaginated = await repository['applyPaginate'](items, 1, 2);
      expect(itemsPaginated).toStrictEqual([items[0], items[1]]);

      itemsPaginated = await repository['applyPaginate'](items, 2, 2);
      expect(itemsPaginated).toStrictEqual([items[2], items[3]]);

      itemsPaginated = await repository['applyPaginate'](items, 3, 2);
      expect(itemsPaginated).toStrictEqual([items[4]]);

      itemsPaginated = await repository['applyPaginate'](items, 4, 2);
      expect(itemsPaginated).toStrictEqual([]);
    });
  });
});
