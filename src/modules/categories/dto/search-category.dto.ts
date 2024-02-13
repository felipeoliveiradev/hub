import { SearchCategoryInput } from '@core/category/application/retrieve/search/search.category.input';
import { SortDirection } from 'nutool/src';

export class SearchCategoryDto extends SearchCategoryInput {
  page?: string;
  per_page?: string;
  sort?: string;
  sort_dir?: SortDirection;
  filter?: string;
}
