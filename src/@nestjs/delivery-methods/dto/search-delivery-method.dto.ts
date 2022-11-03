import { SortDirection } from '../../../@core/commons/repository/repository-contracts';
import { ListDeliveryMethodsUseCase } from '../../../@core/delivery-method/application/use-cases/list-delivery-methods.use-case';

export class SearchDeliveryMethodDto
  implements ListDeliveryMethodsUseCase.Input
{
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
