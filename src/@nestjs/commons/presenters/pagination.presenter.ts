export type PaginationPresenterProps = {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
};

export class PaginationPresenter {
  protected pagination: Record<string, number> = {};

  constructor(props: PaginationPresenterProps) {
    this.pagination.current_page = props.current_page;
    this.pagination.per_page = props.per_page;
    this.pagination.last_page = props.last_page;
    this.pagination.total = props.total;
  }
}
