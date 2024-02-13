import {
  IsNotEmpty,
  IsString,
  ValidationError,
  validateSync,
} from 'class-validator';

type FindByIdCategoryInputConstructorProps = {
  id: string;
};

export class FindByIdCategoryInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(props: FindByIdCategoryInputConstructorProps) {
    if (!props) return;
    Object.assign(this, props);
  }
}
export class ValidateFindByIdCategoryInput {
  static validate(input: FindByIdCategoryInput): ValidationError[] {
    return validateSync(input);
  }
}
