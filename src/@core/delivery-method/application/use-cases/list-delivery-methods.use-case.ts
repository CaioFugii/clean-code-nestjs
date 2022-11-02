import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../commons/application/dto/pagination-output';
import { SearchInputDto } from '../../../commons/application/dto/search-input';
import DefaultUseCase from '../../../commons/application/use-case';
import { DeliveryMethodRepositoryContract } from '../../domain/repository/delivery-method.repository';
import {
  DeliveryMethodOutput,
  DeliveryMethodOutputMapper,
} from '../dto/delivery-method-output.dto';

export namespace ListDeliveryMethodsUseCase {
  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<DeliveryMethodOutput>;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private deliveryMethodRepo: DeliveryMethodRepositoryContract.Repository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const params = new DeliveryMethodRepositoryContract.SearchParams(input);
      const searchResult = await this.deliveryMethodRepo.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(
      searchResult: DeliveryMethodRepositoryContract.SearchResult,
    ): Output {
      const items = searchResult.items.map(deliveryMethod =>
        DeliveryMethodOutputMapper.toOutput(deliveryMethod),
      );
      const pagination = PaginationOutputMapper.toOutput(searchResult);
      return {
        items,
        ...pagination,
      };
    }
  }
}
