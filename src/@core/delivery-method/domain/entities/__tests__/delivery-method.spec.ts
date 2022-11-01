import { omit } from 'lodash';
import UniqueEntityId from '../../../../commons/domain/entities/unique-entity-id';
import { DeliveryMethod } from '../delivery-method';

describe('DeliveryMethod Unit tests', () => {
  test('constructor of DeliveryMethod', () => {
    let deliveryMethod: DeliveryMethod;
    let created_at: Date;
    let updated_at: Date;

    deliveryMethod = new DeliveryMethod({
      name: 'EXPRESS',
    });
    let props = omit(deliveryMethod.props, ['created_at', 'updated_at']);
    expect(props).toStrictEqual({
      name: 'EXPRESS',
      description: null,
      is_active: true,
    });
    expect(deliveryMethod.props.created_at).toBeInstanceOf(Date);
    expect(deliveryMethod.props.updated_at).toBeInstanceOf(Date);

    created_at = new Date();
    updated_at = new Date();

    deliveryMethod = new DeliveryMethod({
      name: 'EXPRESS',
      description: 'some description',
      is_active: false,
      created_at,
      updated_at,
    });
    expect(deliveryMethod.props).toStrictEqual({
      name: 'EXPRESS',
      description: 'some description',
      is_active: false,
      created_at,
      updated_at,
    });

    deliveryMethod = new DeliveryMethod({
      name: 'EXPRESS',
      description: 'other description',
    });
    expect(deliveryMethod.props).toMatchObject({
      name: 'EXPRESS',
      description: 'other description',
    });

    deliveryMethod = new DeliveryMethod({
      name: 'EXPRESS',
      is_active: true,
    });
    expect(deliveryMethod.props).toMatchObject({
      name: 'EXPRESS',
      is_active: true,
    });

    created_at = new Date();
    deliveryMethod = new DeliveryMethod({
      name: 'EXPRESS',
      created_at,
    });
    expect(deliveryMethod.props).toMatchObject({
      name: 'EXPRESS',
      created_at,
    });
  });

  test('id prop', () => {
    let deliveryMethod: DeliveryMethod;

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    expect(deliveryMethod).toHaveProperty('id');
    expect(deliveryMethod.id).not.toBeNull();
    expect(deliveryMethod.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' }, null);
    expect(deliveryMethod).toHaveProperty('id');
    expect(deliveryMethod.id).not.toBeNull();
    expect(deliveryMethod.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' }, undefined);
    expect(deliveryMethod).toHaveProperty('id');
    expect(deliveryMethod.id).not.toBeNull();
    expect(deliveryMethod.uniqueEntityId).toBeInstanceOf(UniqueEntityId);

    deliveryMethod = new DeliveryMethod(
      { name: 'EXPRESS' },
      new UniqueEntityId(),
    );
    expect(deliveryMethod).toHaveProperty('id');
    expect(deliveryMethod.id).not.toBeNull();
    expect(deliveryMethod.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
  });

  test('getter and setter of name prop', () => {
    let deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    expect(deliveryMethod.name).toBe('EXPRESS');

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    deliveryMethod['name'] = 'Cartoon';
    expect(deliveryMethod.name).toBe('Cartoon');
  });

  test('getter and setter of description prop', () => {
    let deliveryMethod: DeliveryMethod;

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    expect(deliveryMethod.name).toBe('EXPRESS');
    expect(deliveryMethod.description).toBeNull();

    deliveryMethod = new DeliveryMethod({
      name: 'EXPRESS',
      description: 'some description',
    });
    expect(deliveryMethod.name).toBe('EXPRESS');
    expect(deliveryMethod.description).toBe('some description');

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    deliveryMethod['description'] = 'other description';
    expect(deliveryMethod.description).toBe('other description');

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    deliveryMethod['description'] = undefined;
    expect(deliveryMethod.description).toBeNull();
  });

  test('getter and setter of is_active prop', () => {
    let deliveryMethod: DeliveryMethod;

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    expect(deliveryMethod.is_active).toBeTruthy();

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS', is_active: false });
    expect(deliveryMethod.is_active).toBeFalsy();

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    deliveryMethod['is_active'] = false;
    expect(deliveryMethod.is_active).toBeFalsy();
  });

  test('getter of created_at prop', () => {
    let deliveryMethod: DeliveryMethod;

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    expect(deliveryMethod.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS', created_at });
    expect(deliveryMethod.created_at).toBe(created_at);
  });

  test('getter of updated_at prop', () => {
    let deliveryMethod: DeliveryMethod;

    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS' });
    expect(deliveryMethod.updated_at).toBeInstanceOf(Date);

    let updated_at = new Date();
    deliveryMethod = new DeliveryMethod({ name: 'EXPRESS', updated_at });
    expect(deliveryMethod.updated_at).toBe(updated_at);
  });

  test('update method', () => {
    const deliveryMethod = new DeliveryMethod({
      name: 'EXPRESS',
      description: 'Nice description',
    });
    deliveryMethod.update('Cartoon', 'Ugly description');
    expect(deliveryMethod.name).toBe('Cartoon');
    expect(deliveryMethod.description).toBe('Ugly description');
  });

  test('activate method', () => {
    const deliveryMethod = new DeliveryMethod({
      name: 'EXPRESS',
      description: 'Nice description',
      is_active: false,
    });
    deliveryMethod.activate();
    expect(deliveryMethod.is_active).toBeTruthy();
  });

  test('deactivate method', () => {
    const deliveryMethod = new DeliveryMethod({
      name: 'EXPRESS',
      description: 'Nice description',
    });
    deliveryMethod.deactivate();
    expect(deliveryMethod.is_active).toBeFalsy();
  });
});
