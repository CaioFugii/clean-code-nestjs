import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '../../../commons/repository/repository-contracts';
import { DeliveryMethod } from '../entities/delivery-method';

export namespace DeliveryMethodRepositoryContract {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<
    DeliveryMethod,
    Filter
  > {}

  export interface Repository
    extends SearchableRepositoryInterface<
      DeliveryMethod,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default DeliveryMethodRepositoryContract;
