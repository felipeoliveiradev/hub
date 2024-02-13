import { UpdateCategoryInput } from '@core/category';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateCategoryWithoutDto extends OmitType(UpdateCategoryInput, [
  'id',
] as const) {}
export class UpdateCategoryDto extends UpdateCategoryWithoutDto {}
