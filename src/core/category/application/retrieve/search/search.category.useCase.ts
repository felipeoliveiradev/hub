import { IUseCase } from '@core/shared/application/useCase.interface';
import {
  CategorySearchParams,
  ICategoryRepository,
} from '../../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../../common/category.output';
import { SearchCategoryInput } from './search.category.input';
import {
  PaginationOutput,
  PaginationOutputMapper,
} from '@core/shared/application/pagination.output';

export class SearchCategoryUseCase
  implements IUseCase<SearchCategoryInput, SearchCategoryOutput>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}
  async execute(input: SearchCategoryInput): Promise<SearchCategoryOutput> {
    const params = new CategorySearchParams(input);
    const entities = await this.categoryRepository.search(params);
    const outputItems = entities.items.map((entity) =>
      CategoryOutputMapper.toOutput(entity),
    );
    console.log(
      PaginationOutputMapper.toOutput(outputItems, entities),
      3141234,
    );
    return PaginationOutputMapper.toOutput(outputItems, entities);
  }
}
export type SearchCategoryOutput = PaginationOutput<CategoryOutput>;
