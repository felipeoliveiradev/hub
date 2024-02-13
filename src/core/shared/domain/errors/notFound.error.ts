import { Entity } from '../entity/entity';

export class NotFoundError extends Error {
  constructor(id: any[] | any, entityClass: new (...args: any[]) => Entity) {
    const idsMessage = Array.isArray(id) ? id.join(', ') : id;
    super(`${entityClass.name} Not Found with id: ${idsMessage}`);
    this.name = 'NotFoundError';
  }
}
