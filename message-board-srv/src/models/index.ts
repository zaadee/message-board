export type ID = number;

export interface Channel {
  id: ID;
  name: string;
}

export interface Message {
  id: ID;
  channelId: ID;
  body: string;
  date: number;
}
export type MessageInput = Omit<Message, 'id'> & Pick<Partial<Message>, 'id'>;

export interface MessageFilter {
  channelId: ID;
}
