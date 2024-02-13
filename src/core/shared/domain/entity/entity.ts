import { Notification } from '../validators/notification/notification.validator';
import { ValueObject } from '../valueObjects/valueObject';

export abstract class Entity {
  notification: Notification = new Notification();
  abstract get entity_id(): ValueObject;
  abstract toJSON(): any;
}
