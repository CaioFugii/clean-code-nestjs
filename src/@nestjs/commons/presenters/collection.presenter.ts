import { Exclude, Expose } from 'class-transformer';
import {
  PaginationPresenter,
  PaginationPresenterProps,
} from './pagination.presenter';

export abstract class CollectionPresenter {
  @Exclude()
  protected metadata: PaginationPresenter;

  constructor(props: PaginationPresenterProps) {
    this.metadata = new PaginationPresenter(props);
  }

  @Expose({ name: 'meta' })
  get meta() {
    return this.metadata;
  }

  // abstract get data();
}
