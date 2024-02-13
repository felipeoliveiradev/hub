import {
  IsNotEmpty,
  IsString,
  ValidationError,
  validateSync,
} from 'class-validator';

type DeleteCategoryInputConstructorProps = {
  id: string;
};

export class DeleteCategoryInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  constructor(props: DeleteCategoryInputConstructorProps) {
    if (!props) return;
    Object.assign(this, props);
  }
}
export class ValidateDeleteCategoryInput {
  static validate(input: DeleteCategoryInput): ValidationError[] {
    return validateSync(input);
  }
}
