import { Uuid } from '@core/shared/domain/valueObjects/cases/uuid/uuid.vo';
import { Category } from '../../../domain/category.entity';
import { CategoryModel } from './category.model';
import { EntityValidationError } from '@core/shared/domain/errors/validation.error';

export class CategoryModelMapper {
  static toModel(entity: Category): CategoryModel {
    return CategoryModel.build({
      category_id: entity.category_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    });
  }
  static toEntity(model: CategoryModel): Category {
    const entity = new Category({
      category_id: new Uuid(model.category_id),
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.created_at,
    });
    entity.validate();
    if (entity.notification.hasErrors())
      throw new EntityValidationError(entity.notification.toJSON());
    return entity;
  }
}
