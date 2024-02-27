import { SortDirection } from '@core/shared/domain/repository/params.search';
import { Category } from '../../../domain/category.entity';
import {
  CategoryFilter,
  ICategoryRepository,
} from '../../../domain/category.repository';
import { Uuid } from '@core/shared/domain/valueObjects/cases/uuid/uuid.vo';
import { InMemorySearchableRepository } from '@core/shared/infra/db/inMemory/inMemory.repository';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category, Uuid>
  implements ICategoryRepository
{
  sortableFields: string[] = ['name', 'created_at'];
  protected async applyFilter(
    items: Category[],
    filter: CategoryFilter,
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }
    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase());
    });
  }
  getEntity(): new (...args: any[]) => Category {
    throw Category;
  }
  protected applySort(
    items: Category[],
    sort: string,
    sort_dir: SortDirection | null,
  ) {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc');
  }
}
