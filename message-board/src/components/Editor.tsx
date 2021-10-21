import React, { FC, useState } from "react";
import validator from "validator";
type Props = {
  onSubmit: (message: string) => void;
};
export const Editor: FC<Props> = (props) => {
  const [messageText, setMessageText] = useState("");
  const handleClick = () => {
    if (!validator.isEmpty(messageText + "")) {
      props.onSubmit(messageText);
      setMessageText("");
    }
  };
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    setMessageText(target.value);
  };
  return (
    <div className="editor">
      <div className="input">
        <textarea value={messageText} onChange={handleChange} />
      </div>
      <div className="submit">
        <button onClick={handleClick}>Send</button>
      </div>
    </div>
  );
};
