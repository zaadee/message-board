import React, { FC, useMemo } from "react";
import { formatDate } from "../share";
type Props = {
  message: string;
  date: number;
  failed: boolean;
  loading: boolean;
  onFailed?: () => void;
};

export const MessageItem: FC<Props> = (props) => {
  const subtitle = useMemo(() => {
    const handleFailure = () => {
      props.onFailed && props.onFailed();
    };
    if (props.loading) {
      return "Sending...";
    }
    if (props.failed && props.onFailed) {
      return <button onClick={handleFailure}>⚠ Send again</button>;
    }
    return formatDate(props.date);
  }, [props]);

  return (
    <div className="message">
      <p>{props.message}</p>
      <div className="status">{subtitle}</div>
    </div>
  );
};
