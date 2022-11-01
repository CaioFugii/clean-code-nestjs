import Entity from '../entity';
import { validate as uuidValidate } from 'uuid';
import UniqueEntityId from '../unique-entity-id';

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe('Entity Unit tests', () => {
  it('should set props and id', () => {
    const arrange = { prop1: 'prop1 value', prop2: 1234 };
    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const arrange = { prop1: 'prop1 value', prop2: 1234 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.id);
  });

  it('should convert a entity to a Javascript Object', () => {
    const arrange = { prop1: 'prop1 value', prop2: 1234 };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(arrange, uniqueEntityId);

    expect(entity.toJSON()).toStrictEqual({ id: entity.id, ...arrange });
  });
});
