import { RootState } from "../../app";
import { ID } from "../models";

export const selectCurrentChannel = (state: RootState) => {
  return state.board.selectedChannel;
};

export const selectMessagesByChannelId =
  (channelId?: ID) => (state: RootState) => {
    const items = Object.values(state.board.messages);
    return items
      .filter((x) => x.channelId === channelId)
      .sort((a, b) => a.date - b.date);
  };

export const selectChannels = (state: RootState) => {
  return Object.values(state.board.channels);
};
