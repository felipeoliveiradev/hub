import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { DatabaseModule } from '@modules/database/database.module';
import { CategoriesModule } from '@modules/categories/categories.module';
import { ConfigModule } from '@modules/config/config.module';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { keycloakConfig } from '@modules/keycloak/keycloak.config';
import { NotificationsGateway } from './modules/notifications/notifications.gateway';
import { HttpModule } from '@nestjs/axios';
import { QueueService } from '@modules/rabbit-mqconnection/rabbit-mqconnection.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KeycloakConnectModule.register(keycloakConfig()),
    HttpModule,
    DatabaseModule,
    CategoriesModule,
    SharedModule,
  ],
  providers: [NotificationsGateway, QueueService],
})
export class AppModule {}
