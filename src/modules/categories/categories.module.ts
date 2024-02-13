import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from '@core/category';
import { CATEGORY_PROVIDERS } from './categories.providers';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { keycloakConfig } from '@modules/keycloak/keycloak.config';

@Module({
  imports: [
    SequelizeModule.forFeature([CategoryModel]),
    KeycloakConnectModule.register(keycloakConfig()),
  ],
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASES),
  ],
})
export class CategoriesModule {}
