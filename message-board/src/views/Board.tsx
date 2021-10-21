import React, { FC, useMemo } from "react";
import {
  BoardLayout,
  List,
  ChannelItem,
  MessageItem,
  Editor,
} from "../components";
import { Channel, FetchStatus, Message } from "../features";

type Props = {
  channels: Channel[];
  messages: Message[];
  editorTimestamp?: number;
  selectedChannel?: Channel;
  onSubmitMessage: (message: string) => void;
  onSelectedChannelChange: (channel: Channel) => void;
  onMessageSubmissionFailure: (message: Message) => void;
};

export const Board: FC<Props> = (props) => {
  const handleMessageSubmissionFailure = (message: Message) => () => {
    props.onMessageSubmissionFailure(message);
  };
  const showEditor = useMemo(
    () => typeof props.selectedChannel !== "undefined",
    [props.selectedChannel]
  );

  return (
    <BoardLayout
      showEditor={showEditor}
      channels={
        <List
          items={props.channels}
          keyExtractor={(item) => item.id}
          selected={props.selectedChannel}
          onClick={props.onSelectedChannelChange}
          onRenderItem={(item) => (
            <ChannelItem
              name={item.name}
              selected={item.id === props.selectedChannel?.id}
            />
          )}
        />
      }
      messages={
        <List
          items={props.messages}
          keyExtractor={(item) => item.id}
          onRenderItem={(item) => (
            <MessageItem
              message={item.body}
              date={item.date}
              failed={item.fetch === FetchStatus.Failed}
              loading={item.fetch === FetchStatus.Loading}
              onFailed={handleMessageSubmissionFailure(item)}
            />
          )}
        />
      }
      editor={
        <Editor key={props.editorTimestamp} onSubmit={props.onSubmitMessage} />
      }
    />
  );
};
