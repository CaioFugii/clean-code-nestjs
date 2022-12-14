import { SearchResult } from '../../../repository/repository-contracts';
import { PaginationOutputMapper } from '../pagination-output';

describe('PaginationOutputMapper Unit Tests', () => {
  it('should convert a a SearchResult in output', () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      current_page: 1,
      per_page: 1,
      sort: 'name',
      sort_direction: 'desc',
      filter: 'fake',
    });

    const output = PaginationOutputMapper.toOutput(result);
    expect(output).toStrictEqual({
      total: 1,
      current_page: 1,
      per_page: 1,
      last_page: 1,
    });
  });
});
