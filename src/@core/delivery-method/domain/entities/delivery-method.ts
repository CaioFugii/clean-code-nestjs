import Entity from '../../../commons/domain/entities/entity';
import UniqueEntityId from '../../../commons/domain/entities/unique-entity-id';

export type DeliveryMethodProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class DeliveryMethod extends Entity<DeliveryMethodProperties> {
  constructor(
    public readonly props: DeliveryMethodProperties,
    id?: UniqueEntityId,
  ) {
    super(props, id);
    this.description = this.props.description;
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.updated_at = this.props.updated_at ?? new Date();
  }

  get name() {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  update(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.props.updated_at = new Date();
  }

  activate() {
    this.props.is_active = true;
    this.props.updated_at = new Date();
  }

  deactivate() {
    this.props.is_active = false;
    this.props.updated_at = new Date();
  }
}
