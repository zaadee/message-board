import React from "react";
import { useAppDispatch, useAppSelector, useMount } from "../app";
import { Board } from "../views";
import {
  Channel,
  createMessage,
  loadChannels,
  Message,
  selectChannels,
  selectCurrentChannel,
  selectMessagesByChannelId,
  switchChannel,
} from "../features";

export const BoardContainer = () => {
  const dispatch = useAppDispatch();
  const currentChannel = useAppSelector(selectCurrentChannel);
  const channels = useAppSelector(selectChannels);
  const messages = useAppSelector(
    selectMessagesByChannelId(currentChannel?.id)
  );

  useMount(() => {
    dispatch(loadChannels());
  });

  const handleMessageSubmissionFailure = (failedMessage: Message) => {
    dispatch(createMessage(failedMessage));
  };

  const handleSelectedChannelChange = (e: Channel) => {
    dispatch(switchChannel(e));
  };

  const handleSubmitMessage = (messageText: string) => {
    if (!currentChannel) {
      return;
    }
    const newMessage = {
      body: messageText,
      channelId: currentChannel.id,
      date: Date.now(),
    };
    dispatch(createMessage(newMessage));
  };

  return (
    <Board
      channels={channels}
      messages={messages}
      selectedChannel={currentChannel}
      onSubmitMessage={handleSubmitMessage}
      onSelectedChannelChange={handleSelectedChannelChange}
      onMessageSubmissionFailure={handleMessageSubmissionFailure}
    />
  );
};
