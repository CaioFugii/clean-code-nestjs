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

    async insert(entity: DeliveryMethod): Promise<void> {
      await this.deliveryMethodModel.create(entity.toJSON());
    }

    async find(): Promise<DeliveryMethod[]> {
      throw new Error('Method not implemented.');
    }

    findById(id: string | UniqueEntityId): Promise<DeliveryMethod> {
      throw new Error('Method not implemented.');
    }

    update(entity: DeliveryMethod): Promise<void> {
      throw new Error('Method not implemented.');
    }

    delete(id: string | UniqueEntityId): Promise<void> {
      throw new Error('Method not implemented.');
    }

    search(
      props: DeliveryMethodRepositoryContract.SearchParams,
    ): Promise<DeliveryMethodRepositoryContract.SearchResult> {
      throw new Error('Method not implemented.');
    }
  }

  export class DeliveryMethodModelMapper {
    static toEntity(document: DeliveryMethodDocument) {
      const { id, ...otherData } = document.toObject();
      try {
        //@ts-ignore-error
        return new DeliveryMethod(otherData, new UniqueEntityId(id));
      } catch (e) {
        // if (e instanceof EntityValidationError) {
        //   throw new LoadEntityError(e.error);
        // }

        throw e;
      }
    }
  }
}
