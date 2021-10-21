import { Message, MessageInput } from '../models';
import { PushService } from './PushService';
import { Service } from './Service';

export class MessageService extends Service {
  async getByChannelId(channelId: number): Promise<Message[]> {
    const messages = await this.dao.all(`select * from messages where channelId=?`, [channelId]);
    return messages as Message[];
  }

  async create(newMessage: MessageInput, deviceId: string): Promise<Message> {
    const id = await this.dao.run(
      `
    Insert into messages 
    (channelId,body,date) 
    values 
    (?,?,?)`,
      [newMessage.channelId, newMessage.body, newMessage.date],
    );
    const message = await this.dao.get(`select * from messages where id=?`, [id]);
    PushService.getInstance().broadcastMessage(message, deviceId);

    return message as Message;
  }
}
