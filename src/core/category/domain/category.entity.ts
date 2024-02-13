import { Uuid } from '@core/shared/domain/valueObjects/cases/uuid/uuid.vo';
import { Entity } from '@core/shared/domain/entity/entity';
import { ValueObject } from '@core/shared/domain/valueObjects/valueObject';
import { CategoryValidatorFactory } from './category.validator';
import { CategoryFakeBuilder } from './categoryFake.builder';

export type CategoryConstructorProps = {
  category_id?: Uuid;
  name: string;
  description?: string | null;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryConstructorCommand = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};
export class Category extends Entity {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  get entity_id(): ValueObject {
    return this.category_id;
  }

  static create(props: CategoryConstructorCommand): Category {
    const category: Category = new Category(props);
    category.validate(['name']);
    return category;
  }

  static fake() {
    return CategoryFakeBuilder;
  }
  changeName(name: string): void {
    this.name = name;
    this.validate(['name']);
  }
  changeDescription(description: string): void {
    this.description = description;
  }

  activate(): void {
    this.is_active = true;
  }

  deactivate(): void {
    this.is_active = false;
  }

  validate(fields?: string[]): boolean {
    const validator = CategoryValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }
  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
