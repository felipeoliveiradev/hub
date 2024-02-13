import {
  IsOptional,
  IsString,
  ValidationError,
  validateSync,
} from 'class-validator';
import { CategoryFilter } from '../../../domain/category.repository';
import { SortDirection } from 'nutool/src';

type SearchCategoryInputConstructorProps = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CategoryFilter | null;
};

export class SearchCategoryInput {
  @IsString()
  @IsOptional()
  page?: string | number;
  @IsString()
  @IsOptional()
  per_page?: string;
  @IsString()
  @IsOptional()
  sort?: string | null;
  @IsString()
  @IsOptional()
  sort_dir?: SortDirection | null;
  @IsString()
  @IsOptional()
  filter?: CategoryFilter | null;

  constructor(props: SearchCategoryInputConstructorProps) {
    if (!props) return;
    Object.assign(this, props);
  }
}
export class ValidateSearchCategoryInput {
  static validate(input: SearchCategoryInput): ValidationError[] {
    return validateSync(input);
  }
}
