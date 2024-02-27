import {
  CategoryInMemoryRepository,
  CategoryModel,
  CategorySequelizeRepository,
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  FindAllCategoryUseCase,
  FindByIdCategoryUseCase,
  ICategoryRepository,
  SearchCategoryUseCase,
  UpdateCategoryUseCase,
} from '@core/category';
import { getModelToken } from '@nestjs/sequelize';
export const REPOSITORIES = {
  CATEGORY_REPOSITORY: {
    provide: 'CategoryRepository',
    useExisting: CategorySequelizeRepository,
  },
  CATEGORY_IN_MEMORY_REPOSITORY: {
    provide: CategoryInMemoryRepository,
    useClass: CategoryInMemoryRepository,
  },
  CATEGORY_SEQUELIZE_REPOSITORY: {
    provide: CategorySequelizeRepository,
    useFactory: (categoryModel: typeof CategoryModel) => {
      return new CategorySequelizeRepository(categoryModel);
    },
    inject: [getModelToken(CategoryModel)],
  },
};

export const USE_CASES = {
  CREATE_CATEGORY_USE_CASE: {
    provide: CreateCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new CreateCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  UPDATE_CATEGORY_USE_CASE: {
    provide: UpdateCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new UpdateCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  FIND_ALL_CATEGORIES_USE_CASE: {
    provide: FindAllCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new FindAllCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  LIST_CATEGORIES_USE_CASE: {
    provide: SearchCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new SearchCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  GET_CATEGORY_USE_CASE: {
    provide: FindByIdCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new FindByIdCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
  DELETE_CATEGORY_USE_CASE: {
    provide: DeleteCategoryUseCase,
    useFactory: (categoryRepo: ICategoryRepository) => {
      return new DeleteCategoryUseCase(categoryRepo);
    },
    inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
  },
};

// export const VALIDATIONS = {
//   CATEGORIES_IDS_EXISTS_IN_DATABASE_VALIDATOR: {
//     provide: CategoriesIdExistsInDatabaseValidator,
//     useFactory: (categoryRepo: ICategoryRepository) => {
//       return new CategoriesIdExistsInDatabaseValidator(categoryRepo);
//     },
//     inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
//   },
// };

export const CATEGORY_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
  // VALIDATIONS,
};
