import { CategoryInMemoryRepository } from '../../../../infra/db/inMemory/categoryInMemory.repository';
import { CreateCategoryUseCase } from '../../create.category.useCase';

describe('CreateCategoryUseCase Unit Tests', () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  it('should throw an error when aggregate is not valid', async () => {
    const input = { name: 't'.repeat(256), description: null, is_active: true };
    await expect(() => useCase.execute(input)).rejects.toThrowError(
      'Entity Validation Error',
    );
  });

  it('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({
      name: 'test',
      description: null,
      is_active: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].category_id.id,
      name: 'test',
      description: null,
      is_active: false,
      created_at: repository.items[0].created_at,
    });

    output = await useCase.execute({
      name: 'test',
      description: 'some description',
      is_active: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].category_id.id,
      name: 'test',
      description: 'some description',
      is_active: false,
      created_at: repository.items[1].created_at,
    });
  });
});
