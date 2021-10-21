import React, { FC } from "react";

type Props = {
  showEditor: boolean;
  channels: React.ReactElement;
  messages: React.ReactElement;
  editor: React.ReactElement;
};

export const BoardLayout: FC<Props> = (props) => {
  return (
    <div className="board">
      <div className="channels">{props.channels}</div>
      <div className="messages">
        <div className="content">{props.messages}</div>
        {props.showEditor && <div className="editor">{props.editor}</div>}
      </div>
    </div>
  );
};
