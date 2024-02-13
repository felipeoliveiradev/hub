import { IUseCase } from '@core/shared/application/useCase.interface';
import { ICategoryRepository } from '../../domain/category.repository';
import { DeleteCategoryInput } from './delete.category.input';
import { Uuid } from '@core/shared/domain/valueObjects/cases/uuid/uuid.vo';

export class DeleteCategoryUseCase
  implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(input: DeleteCategoryInput): Promise<void> {
    const uuid = new Uuid(input.id);
    await this.categoryRepository.delete(uuid);
  }
}
export type DeleteCategoryOutput = void;
