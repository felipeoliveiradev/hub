import { MaxLength } from 'class-validator';
import { Category } from './category.entity';
import { ClassValidatorFields } from '@core/shared/domain/validators/classValidator/classValidatorFields.va';
import { Notification } from '@core/shared/domain/validators/notification/notification.validator';

class CategoryRules<T> {
  @MaxLength(255, { groups: ['name'] })
  name: string;

  constructor(entity: T) {
    Object.assign(this, entity);
  }
}

export class CategoryValidator extends ClassValidatorFields<any> {
  validate(
    notification: Notification,
    data: Category,
    fields?: string[],
  ): boolean {
    const newFields = fields?.length ? fields : ['name'];
    return super.validate(notification, new CategoryRules(data), newFields);
  }
}

export class CategoryValidatorFactory {
  static create() {
    return new CategoryValidator();
  }
}
