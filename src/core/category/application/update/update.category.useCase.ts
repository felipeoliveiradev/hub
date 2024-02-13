import { Uuid } from '@core/shared/domain/valueObjects/cases/uuid/uuid.vo';
import { Category } from '../../domain/category.entity';
import { ICategoryRepository } from '../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category.output';
import { UpdateCategoryInput } from './update.category.input';
import { IUseCase } from '@core/shared/application/useCase.interface';
import { NotFoundError } from '@core/shared/domain/errors/notFound.error';

export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const uuid = new Uuid(input.id);
    const entity = await this.categoryRepository.findById(uuid);
    if (!entity) throw new NotFoundError(uuid, Category);
    input.name && entity.changeName(input.name);
    if (input.description) entity.changeDescription(input.description);
    if (input.is_active === true) entity.activate();
    if (input.is_active === false) entity.deactivate();
    await this.categoryRepository.update(entity);
    return CategoryOutputMapper.toOutput(entity);
  }
}
export type UpdateCategoryOutput = CategoryOutput;
