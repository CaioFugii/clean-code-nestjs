import { InMemorySearchableRepository } from '../../../../commons/repository/in-memory.repository';
import { DeliveryMethod } from '../../../domain/entities/delivery-method';
import { DeliveryMethodRepositoryContract } from '../../../domain/repository/delivery-method.repository';

export class DeliveryMethodInMemoryRepository
  extends InMemorySearchableRepository<DeliveryMethod>
  implements DeliveryMethodRepositoryContract.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: DeliveryMethod[],
    filter?: DeliveryMethodRepositoryContract.Filter,
  ): Promise<DeliveryMethod[]> {
    if (!filter) {
      return items;
    }

    return items.filter(item => {
      return item.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: DeliveryMethod[],
    sort?: string,
    sort_direction?: string,
  ): Promise<DeliveryMethod[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_direction);
  }
}
