import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidationError,
  validateSync,
} from 'class-validator';

type CreateCategoryInputConstructorProps = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class CreateCategoryInput {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  description: string | null;
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  constructor(props: CreateCategoryInputConstructorProps) {
    if (!props) return;
    Object.assign(this, props);
  }
}
export class ValidateCreateCategoryInput {
  static validate(input: CreateCategoryInput): ValidationError[] {
    return validateSync(input);
  }
}
