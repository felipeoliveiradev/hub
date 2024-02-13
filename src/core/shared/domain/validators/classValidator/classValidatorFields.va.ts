import { validateSync } from 'class-validator';
import { IValidatorFields } from './interface.classValidator.va';
import { Notification } from '../notification/notification.validator';
export abstract class ClassValidatorFields<T> implements IValidatorFields<T> {
  validate(notification: Notification, data: T, fields: string[]): boolean {
    const errors = validateSync(data as object, {
      groups: fields,
    });
    if (errors.length) {
      for (const error of errors) {
        const field = error.property;
        Object.values(error.constraints!).forEach((message) => {
          notification.addError(message, field);
        });
      }
    }
    return !errors.length;
  }
}
