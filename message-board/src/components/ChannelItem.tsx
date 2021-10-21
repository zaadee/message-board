import React, { FC, useMemo } from "react";

type Props = {
  selected: boolean;
  name: string;
};

export const ChannelItem: FC<Props> = (props) => {
  const className = useMemo(() => {
    if (props.selected) {
      return "channel-item selected";
    }
    return "channel-item";
  }, [props.selected]);

  return (
    <div className={className}>
      <p>{props.name}</p>
    </div>
  );
};
