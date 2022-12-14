import Entity from '../domain/entities/entity';
import UniqueEntityId from '../domain/entities/unique-entity-id';
import NotFoundError from '../errors/not-found.error';
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
} from './repository-contracts';

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];

  async insert(entity: E): Promise<E> {
    this.items.push(entity);
    return entity;
  }
  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`;
    const item = await this._get(_id);
    return item;
  }

  async find(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<E> {
    await this._get(entity.id);
    const index = this.items.findIndex(i => i.id === entity.id);
    this.items[index] = entity;
    return entity;
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const index = this.items.findIndex(i => i.id === _id);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find(i => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity Not Found using ID ${id}`);
    }
    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];
  async search(props: SearchParams): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_direction,
    );
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page,
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_direction: props.sort_direction,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter?: string | null,
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort?: string | null,
    sort_direction?: string | null,
  ) {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a.props[sort] < b.props[sort]) {
        return sort_direction === 'asc' ? -1 : 1;
      }

      if (a.props[sort] > b.props[sort]) {
        return sort_direction === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: SearchParams['page'],
    per_page: SearchParams['per_page'],
  ) {
    const start = (page - 1) * per_page;
    const limit = start + per_page;
    return items.slice(start, limit);
  }
}
