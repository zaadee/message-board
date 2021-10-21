import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { Channel, Message, MessageFilter, MessageInput } from "../models";

export const updateMessage = createAction<Message>("@board/message/update");

export const switchChannel = createAsyncThunk(
  "@board/channels/switch",
  (channel: Channel, { dispatch }) => {
    dispatch(loadMessages({ channelId: channel.id }));
    return channel;
  }
);

export const loadMessages = createAsyncThunk(
  "@board/messages/load",
  async (args: MessageFilter) => {
    return await api.messages.byChannelId(args);
  }
);

export const createMessage = createAsyncThunk(
  "@board/messages/create",
  async (args: MessageInput) => {
    return await api.messages.create(args);
  }
);

export const loadChannels = createAsyncThunk(
  "@board/channels/load",
  async () => {
    return await api.channels.all();
  }
);
