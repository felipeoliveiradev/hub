import { IUseCase } from '@core/shared/application/useCase.interface';
import { ICategoryRepository } from '../../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../../common/category.output';
import { Uuid } from '@core/shared/domain/valueObjects/cases/uuid/uuid.vo';

export class FindByIdCategoryUseCase
  implements IUseCase<FindByIdInput, FindByIdOutput>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(input: FindByIdInput): Promise<FindByIdOutput> {
    const uuid = new Uuid(input.id);
    const entity = await this.categoryRepository.findById(uuid);
    return CategoryOutputMapper.toOutput(entity);
  }
}

export type FindByIdInput = {
  id: string;
};
export type FindByIdOutput = CategoryOutput;
