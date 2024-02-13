import {
  CategoryOutput,
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  FindByIdCategoryUseCase,
  SearchCategoryUseCase,
  UpdateCategoryUseCase,
} from '@core/category';
import { FindAllCategoryUseCase } from '@core/category';
import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  CategoriesCollectionsPresenter,
  CategoriesPresenter,
} from './categories.presenter';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { AuthGuard, ResourceGuard } from 'nest-keycloak-connect';
import amqp, { Channel } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';

@Controller('categories')
@UseGuards(AuthGuard, ResourceGuard)
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private createUseCase: CreateCategoryUseCase;

  @Inject(UpdateCategoryUseCase)
  private updateUseCase: UpdateCategoryUseCase;

  @Inject(DeleteCategoryUseCase)
  private deleteUseCase: DeleteCategoryUseCase;

  @Inject(FindAllCategoryUseCase)
  private findAllUseCase: FindAllCategoryUseCase;

  @Inject(SearchCategoryUseCase)
  private searchUseCase: SearchCategoryUseCase;

  @Inject(FindByIdCategoryUseCase)
  private findByidUseCase: FindByIdCategoryUseCase;

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const output = await this.createUseCase.execute(createCategoryDto);
    return CategoriesController.serializer(output);
  }
  @Get()
  async search(@Query() searchCategoryDto: SearchCategoryDto) {
    const output = await this.searchUseCase.execute(searchCategoryDto);
    return new CategoriesCollectionsPresenter(output);
  }
  @Get('list')
  async findAll() {
    const teste = amqp.connect(['amqp://admin:admin@rabbitmq:5672']);
    const teste2 = teste.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('emailQueue', { durable: true });
      },
    });

    try {
      const email = `teste${Math.random()}@teste.com`;
      await teste2.sendToQueue(
        'emailQueue',
        Buffer.from(JSON.stringify(email)),
        {
          persistent: true,
        },
      );
      await teste2.addSetup(async (channel: ConfirmChannel) => {
        await channel.assertQueue('emailQueue', { durable: true });
        const casa = await channel.checkQueue('emailQueue');
        console.log('casa', casa);
        await channel.consume('emailQueue', async (message) => {
          if (message) {
            if (message.content.toString() === `"${email}"`)
              console.log(message.fields.deliveryTag);
            // const content = JSON.parse(message.content.toString());
            // console.log('Received message:', content);
            // await this.emailService.sendEmail(content);
            // channel.ack(message);
          }
        });
      });
    } catch (error) {
      console.log('error', error);
    }
    // const output = await this.findAllUseCase.execute();
    // return CategoriesController.serializer(output);
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    const output = await this.findByidUseCase.execute({ id });
    return CategoriesController.serializer(output);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const output = await this.updateUseCase.execute({
      ...updateCategoryDto,
      id,
    });
    return CategoriesController.serializer(output);
  }

  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({ errorHttpStatusCode: 422 })) id: string,
  ) {
    return this.deleteUseCase.execute({ id });
  }
  static serializer(output: CategoryOutput) {
    return new CategoriesPresenter(output);
  }
}
