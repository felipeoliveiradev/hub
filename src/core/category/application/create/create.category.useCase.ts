import { IUseCase } from '@core/shared/application/useCase.interface';
import { Category } from '../../domain/category.entity';
import { ICategoryRepository } from '../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category.output';
import { CreateCategoryInput } from './create.category.input';
import { EntityValidationError } from '@core/shared/domain/errors/validation.error';

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryInput, CreateCategoryOutput>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const entity = Category.create(input);
    if (entity.notification.hasErrors())
      throw new EntityValidationError(entity.notification.toJSON());
    await this.categoryRepository.insert(entity);
    return CategoryOutputMapper.toOutput(entity);
  }
}
export type CreateCategoryOutput = CategoryOutput;
