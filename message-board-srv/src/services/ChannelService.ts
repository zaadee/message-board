import { Channel } from '../models';
import { Service } from './Service';

export class ChannelService extends Service {
  async all(): Promise<Channel[]> {
    const items = await this.dao.all(`select * from channels`);
    return items as Channel[];
  }
}
