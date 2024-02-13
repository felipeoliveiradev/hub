import { Entity } from '../../../domain/entity/entity';
import { NotFoundError } from '../../../domain/errors/notFound.error';
import { Uuid } from '../../../domain/valueObjects/cases/uuid/uuid.vo';
import { InMemoryRepository } from './inMemory.repository';

type StubEntityProps = {
  entity_id?: Uuid;
  name: string;
  price: number;
};
export class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityProps) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }
  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repo: StubInMemoryRepository;
  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });
  test('should insert a new entity', async () => {
    const entity = new StubEntity({ name: 'Entity 1', price: 100 });
    await repo.insert(entity);
    expect(repo.items).toHaveLength(1);
    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toBe(entity);
  });

  test('should bulk insert entities', async () => {
    const entities = [
      new StubEntity({ name: 'Entity 1', price: 100 }),
      new StubEntity({ name: 'Entity 2', price: 200 }),
      new StubEntity({ name: 'Entity 3', price: 300 }),
    ];
    await repo.bulkInsert(entities);
    expect(repo.items).toHaveLength(3);
    expect(repo.items.length).toBe(3);
    expect(repo.items).toEqual(entities);
  });

  test('should update an entity', async () => {
    const entity = new StubEntity({ name: 'Entity 1', price: 100 });
    await repo.insert(entity);
    const entityUpdated = new StubEntity({
      entity_id: entity.entity_id,
      name: 'Entity 1 Updated',
      price: 200,
    });
    await repo.update(entityUpdated);
    expect(repo.items).toHaveLength(1);
    expect(repo.items.length).toBe(1);
    expect(repo.items[0]).toBe(entityUpdated);
  });
  test('should throws error on update when entity not found', async () => {
    const entity = new StubEntity({ name: 'Entity 1', price: 100 });
    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity),
    );
  });

  test('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'Entity 1', price: 100 });
    await repo.insert(entity);
    await repo.delete(entity.entity_id);
    expect(repo.items).toHaveLength(0);
    expect(repo.items.length).toBe(0);
  });

  test('should throws error on delete when entity not found', async () => {
    const entity = new StubEntity({ name: 'Entity 1', price: 100 });
    await expect(repo.delete(entity.entity_id)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity),
    );
  });

  test('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'Entity 1', price: 100 });
    await repo.insert(entity);
    const entityFound = await repo.findById(entity.entity_id);
    expect(entityFound).toBe(entity);
  });

  test('should return null when entity is not found', async () => {
    const entity = new StubEntity({ name: 'Entity 1', price: 100 });
    const entityFound = await repo.findById(entity.entity_id);
    expect(entityFound).toBeNull();
  });

  test('should find all entities', async () => {
    const entities = [
      new StubEntity({ name: 'Entity 1', price: 100 }),
      new StubEntity({ name: 'Entity 2', price: 200 }),
      new StubEntity({ name: 'Entity 3', price: 300 }),
    ];
    await repo.bulkInsert(entities);
    const entitiesFound = await repo.findAll();
    expect(entitiesFound).toEqual(entities);
  });

  test('should return the entity class', () => {
    const entityClass = repo.getEntity();
    expect(entityClass).toBe(StubEntity);
  });
});
