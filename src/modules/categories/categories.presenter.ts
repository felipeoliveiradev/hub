import { CategoryOutput, SearchCategoryOutput } from '@core/category';
import { CollectionPresenter } from '@modules/shared/presenters/collections.presenter';
import { Transform } from 'class-transformer';

export class CategoriesPresenter {
  id: string;
  name: string;
  description: string;
  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date;
  constructor(output: CategoryOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.created_at = output.created_at;
  }
}

export class CategoriesCollectionsPresenter extends CollectionPresenter {
  data: CategoriesPresenter[];
  constructor(output: SearchCategoryOutput) {
    const { items, ...otherProps } = output;
    super(otherProps);
    this.data = items.map((i) => {
      return new CategoriesPresenter(i);
    });
  }
}
