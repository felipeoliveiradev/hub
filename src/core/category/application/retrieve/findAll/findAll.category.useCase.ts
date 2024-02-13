import { IUseCase } from 'nutool/src';
import { ICategoryRepository } from '../../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../../common/category.output';

export class FindAllCategoryUseCase
  implements IUseCase<FindAllCategoryInput, FindAllCategoryOutput>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(): Promise<FindAllCategoryOutput> {
    const entities = await this.categoryRepository.findAll();
    return entities.map((entity) => CategoryOutputMapper.toOutput(entity));
  }
}
export type FindAllCategoryInput = void;
export type FindAllCategoryOutput = CategoryOutput[];
