import UniqueEntityId from '../../../../commons/domain/entities/unique-entity-id';
import { DeliveryMethod } from '../../../domain/entities/delivery-method';
import { DeliveryMethodRepositoryContract } from '../../../domain/repository/delivery-method.repository';
import { Schema, Model, Document } from 'mongoose';

export namespace DeliveryMethodMongoDB {
  type DeliveryMethodProps = {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  };

  export const DeliveryMethodSchema = new Schema<DeliveryMethodProps>(
    {
      id: { type: String, required: true, unique: true },
      name: { type: String, required: true, unique: true },
      description: { type: String, required: false },
      is_active: { type: Boolean, required: true },
      created_at: { type: Date, required: true },
      updated_at: { type: Date, required: true },
    },
    { autoIndex: true, timestamps: false, collection: 'deliveryMethods' },
  ).index({ id: 1 });

  export class DeliveryMethodModel extends Model<DeliveryMethodProps> {}

  type DeliveryMethodDocument = DeliveryMethodModel & Document;

  export class DeliveryMethodRepository
    implements DeliveryMethodRepositoryContract.Repository
  {
    sortableFields: string[] = ['name', 'created_at'];
    constructor(private deliveryMethodModel: typeof DeliveryMethodModel) {}
    delete(id: string | UniqueEntityId): Promise<void> {
      throw new Error('Method not implemented.');
    }

    async insert(entity: DeliveryMethod): Promise<DeliveryMethod> {
      const deliveryMethodCreated = await this.deliveryMethodModel.create(
        entity.toJSON(),
      );
      return DeliveryMethodModelMapper.toEntity(deliveryMethodCreated);
    }

    async find(): Promise<DeliveryMethod[]> {
      const documents = await this.deliveryMethodModel.find();
      return documents.map(m => DeliveryMethodModelMapper.toEntity(m));
    }

    async findById(id: string | UniqueEntityId): Promise<DeliveryMethod> {
      const document = await this.deliveryMethodModel.findOne({ id });
      return DeliveryMethodModelMapper.toEntity(document);
    }

    async update(entity: DeliveryMethod): Promise<DeliveryMethod> {
      const document = await this.deliveryMethodModel.findOneAndUpdate(
        { id: entity.id },
        entity.toJSON(),
        { new: true },
      );

      return DeliveryMethodModelMapper.toEntity(document);
    }

    async search(
      props: DeliveryMethodRepositoryContract.SearchParams,
    ): Promise<DeliveryMethodRepositoryContract.SearchResult> {
      const filter: Record<string, any> = {};
      const offset = (props.page - 1) * props.per_page;
      const limit = props.per_page;

      if (props.filter) {
        filter['name'] = { $regex: `${props.filter}.*`, $options: 'i' };
      }

      const count = await this.deliveryMethodModel.countDocuments(filter);

      const documents = await this.deliveryMethodModel
        .find(filter)
        .limit(limit)
        .skip(offset)
        .sort({ [props.sort]: props.sort_direction === 'asc' ? 1 : -1 });

      return new DeliveryMethodRepositoryContract.SearchResult({
        items: documents.map(document =>
          DeliveryMethodModelMapper.toEntity(document),
        ),
        current_page: props.page,
        per_page: props.per_page,
        total: count,
        filter: props.filter,
        sort: props.sort,
        sort_direction: props.sort_direction,
      });
    }
  }

  export class DeliveryMethodModelMapper {
    static toEntity(document: DeliveryMethodDocument) {
      try {
        const { id, ...otherData } = document.toJSON();
        //@ts-ignore-error
        return new DeliveryMethod(otherData, new UniqueEntityId(id));
      } catch (error) {
        console.log(error);
      }
    }
  }
}
