import { Injectable } from '@nestjs/common';
import amqp, { Channel } from 'amqp-connection-manager';
import ChannelWrapper from 'amqp-connection-manager/dist/types/ChannelWrapper';
import { Message } from 'amqplib';

@Injectable()
export class QueueService {
  private list = [];
  private async setupChannel(queueName: string): Promise<ChannelWrapper> {
    const queueConnect = amqp.connect(['amqp://admin:admin@rabbitmq:5672']);
    const channel = queueConnect.createChannel({
      setup: async (ch: Channel) => {
        await ch.assertQueue(queueName, { durable: true });
        await ch.consume(queueName, this.processMessage.bind(this));
      },
    });
    await channel.waitForConnect();
    return channel;
  }

  async consumeMessages(queueName: string): Promise<Array<any>> {
    await this.setupChannel(queueName);
    return this.list;
  }

  async sendMessageToQueue(queueName: string, data: any) {
    const channel = await this.setupChannel(queueName);
    await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
      persistent: true,
    });
  }

  async sendMessageToAck(queueName: string) {
    const channel = await this.setupChannel(queueName);
    await channel.ackAll();
  }

  private async processMessage(message: Message | null) {
    if (message) {
      const objects = JSON.parse(message.content.toString());
      const listItem = {
        username: objects.username,
        id: objects.id,
        position: message.fields.deliveryTag,
      };
      this.list.push(listItem);
      return listItem;
    }
  }
}
