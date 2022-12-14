import Entity from '../domain/entities/entity';
import UniqueEntityId from '../domain/entities/unique-entity-id';

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<E>;
  findById(id: string | UniqueEntityId): Promise<E>;
  find(): Promise<E[]>;
  update(entity: E): Promise<E>;
  delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_direction?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams<Filter = string> {
  protected _page: number = 1;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_direction: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchProps<Filter> = {}) {
    this.page = props.page;
    this.per_page = props.per_page;
    this.sort = props.sort;
    this.sort_direction = props.sort_direction;
    this.filter = props.filter;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    let _page = parseInt(value as any);
    if (Number.isNaN(_page) || _page < 0) {
      _page = 1;
    }
    this._page = _page;
  }

  get per_page(): number {
    return this._per_page;
  }

  private set per_page(value: number) {
    let _per_page = parseInt(value as any);
    if (Number.isNaN(_per_page) || _per_page <= 0) {
      _per_page = this._per_page;
    }
    this._per_page = _per_page;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get sort_direction(): SortDirection | null {
    return this._sort_direction;
  }

  private set sort_direction(value: string | null) {
    if (!this._sort) {
      this._sort_direction = null;
      return;
    }
    const direction = `${value}`.toLowerCase();
    this._sort_direction =
      direction !== 'asc' && direction !== 'desc' ? 'asc' : direction;
  }

  get filter(): Filter | null {
    return this._filter;
  }

  private set filter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || (value as unknown) === ''
        ? null
        : (`${value}` as any);
  }
}

export type SearchResultProps<E extends Entity, Filter> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_direction: string | null;
  filter: Filter;
};

export class SearchResult<E extends Entity = Entity, Filter = string> {
  readonly items: E[];
  readonly total: number;
  readonly current_page: number;
  readonly per_page: number;
  readonly last_page: number;
  readonly sort: string | null;
  readonly sort_direction: string | null;
  readonly filter: Filter;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.current_page = props.current_page;
    this.per_page = props.per_page;
    this.last_page = Math.ceil(this.total / this.per_page);
    this.sort = props.sort;
    this.sort_direction = props.sort_direction;
    this.filter = props.filter;
  }

  toJSON() {
    return {
      items: this.items,
      total: this.total,
      current_page: this.current_page,
      per_page: this.per_page,
      last_page: this.last_page,
      sort: this.sort,
      sort_direction: this.sort_direction,
      filter: this.filter,
    };
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>,
> extends RepositoryInterface<E> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}
