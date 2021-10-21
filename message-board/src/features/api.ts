import Axios from "axios";
import { Device } from "./push";
import { Message, Channel, MessageFilter, MessageInput } from "./models";

const axios = Axios.create({
  baseURL: process.env.REACT_APP_REMOTE,
  headers: { "x-device-id": Device.ID },
});

export const api = {
  channels: {
    all: async () => {
      const result = await axios.get("/channels");
      return result.data as Channel[];
    },
  },
  messages: {
    create: async ({ channelId, ...rest }: MessageInput) => {
      const result = await axios.post(`/messages/${channelId}`, rest);
      return result.data as Message;
    },
    byChannelId: async ({ channelId }: MessageFilter) => {
      const result = await axios.get(`/messages/${channelId}`);
      return result.data as Message[];
    },
  },
};
