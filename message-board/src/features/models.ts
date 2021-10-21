export type ID = string | number;

export enum FetchStatus {
  Loading,
  Failed,
}

export interface Resource {
  fetch?: FetchStatus;
}

export interface Channel {
  id: ID;
  name: string;
}

export interface Message extends Resource {
  id: ID;
  channelId: ID;
  body: string;
  date: number;
}
export type MessageInput = Omit<Message, "id"> & Pick<Partial<Message>, "id">;

export interface MessageFilter {
  channelId: ID;
}
