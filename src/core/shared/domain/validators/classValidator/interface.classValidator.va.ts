import { Notification } from '../notification/notification.validator';

export interface IValidatorFields<T> {
  validate(notification: Notification, data: T, fields: string[]): boolean;
}
