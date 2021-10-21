import { createSlice } from "@reduxjs/toolkit";
import { switchChannel } from "./operations";
import { Channel, ID, Message, FetchStatus } from "../models";
import {
  createMessage,
  loadChannels,
  loadMessages,
  updateMessage,
} from "./operations";
import { combinePayload } from "../../share";

type State = {
  selectedChannel?: Channel;
  channels: Record<ID, Channel>;
  messages: Record<ID, Message>;
};
const initialState: State = {
  channels: {},
  messages: {},
};
export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(switchChannel.fulfilled, (state, { payload }) => {
      state.selectedChannel = payload;
    });

    builder.addCase(loadChannels.fulfilled, (state, { payload }) => {
      combinePayload(payload, state.channels, (src) => src);
    });

    builder.addCase(loadMessages.fulfilled, (state, { payload }) => {
      combinePayload(payload, state.messages, (src) => src);
    });

    builder.addCase(createMessage.pending, (state, { meta }) => {
      const { requestId, arg } = meta;
      if (arg.id) {
        delete state.messages[arg.id];
      }
      state.messages[requestId] = {
        ...arg,
        id: requestId,
        fetch: FetchStatus.Loading,
      };
    });
    builder.addCase(createMessage.rejected, (state, { meta }) => {
      const { requestId } = meta;
      state.messages[requestId].fetch = FetchStatus.Failed;
    });

    builder.addCase(createMessage.fulfilled, (state, { payload, meta }) => {
      const { requestId } = meta;
      delete state.messages[requestId];
      state.messages[payload.id] = payload;
    });
    builder.addCase(updateMessage, (state, { payload }) => {
      state.messages[payload.id] = payload;
    });
  },
});
export const boardReducer = boardSlice.reducer;
