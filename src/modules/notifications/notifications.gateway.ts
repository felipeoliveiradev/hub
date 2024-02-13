import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import axios from 'axios';
import { QueueService } from '@modules/rabbit-mqconnection/rabbit-mqconnection.module';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  keycloak: {
    enabled: true,
    bearerOnly: true,
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private server: Server;

  constructor(private readonly queueService: QueueService) {
    this.server = null;
  }

  @SubscribeMessage('listsQueue')
  async handleLists() {
    const queueName = 'queueList';
    const lists = await this.queueService.consumeMessages(queueName);
    this.server.emit('listsQueue', lists);
  }
  //SUBSCRIBE OF TEST
  // @SubscribeMessage('ok')
  // async handleOk() {
  //   const queueName = 'queueList';
  //   await this.queueService.sendMessageToAck(queueName);
  //   const lists = await this.queueService.consumeMessages(queueName);
  //   this.server.emit('listsQueue', lists);
  // }

  @SubscribeMessage('joinList')
  async handleJoinList(client: object) {
    const dataVerify = await this.verifyToken(client);
    console.log(dataVerify);
    if (dataVerify) {
      const queueName = 'queueList';
      const lists = await this.queueService.consumeMessages(queueName);
      const filter = lists.filter(
        (item: any) => item.username === dataVerify.username,
      );
      if (lists.length === 0 || (lists.length > 0 && filter.length === 0)) {
        await this.queueService.sendMessageToQueue(queueName, dataVerify);
      }
      if (filter.length > 0) {
        const lists = await this.queueService.consumeMessages(queueName);
        this.server.emit('listsQueue', lists);
      }
    }
  }

  @SubscribeMessage('myPosition')
  async handleMyNumber(client: any, user: any) {
    const dataVerify = await this.verifyToken(client);
    if (dataVerify) {
      this.server.emit(
        'newNumber',
        `Hello ${dataVerify.username} you're the number 2`,
      );
    }
  }

  async verifyToken(client: any) {
    try {
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
          token: client.handshake.headers.authorization.replace('Bearer ', ''),
          client_id: 'nests',
          client_secret: 'nS74XHcAY8qIhUMxT5bWowY1nYg6JPLo',
        }),
        url: 'http://keycloak:8080/realms/auth-realm/protocol/openid-connect/token/introspect',
      };

      const response = await axios(options);
      if (response.data.active && response.data.active === true) {
        return response.data;
      }
      this.server.emit('error', 'Invalid token2');
      return null;
    } catch (ex) {
      this.server.emit('error', 'Invalid token');
      return null;
    }
  }

  afterInit(server: Server) {
    this.server = server;
    console.log('socket server is runninggg');
  }

  handleConnection(client: any) {
    // verify({ server: this.server, client });
  }

  handleDisconnect(client: any) {
    console.log(client.id, 'disconnect');
  }
}
