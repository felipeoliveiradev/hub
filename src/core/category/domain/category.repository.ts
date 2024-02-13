import { SearchParams } from '@core/shared/domain/repository/params.search';
import { Category } from './category.entity';
import { SearchResult } from '@core/shared/domain/repository/results.search';
import { ISearchableRepository } from '@core/shared/domain/repository/interface.repository';
import { Uuid } from '@core/shared/domain/valueObjects/cases/uuid/uuid.vo';

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

export interface ICategoryRepository
  extends ISearchableRepository<
    Category,
    Uuid,
    CategoryFilter,
    CategorySearchParams,
    CategorySearchResult
  > {}
