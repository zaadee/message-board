import React from "react";

type Props<T> = {
  items: T[];
  selected?: T;
  onClick?: (item: T, index: number) => void;
  keyExtractor: (item: T, index: number) => any;
  onRenderItem: (item: T, index: number, selected?: T) => React.ReactElement;
};
export const List = <T extends Object>(props: Props<T>) => {
  const handleClick = (item: any, index: number) => () => {
    props.onClick && props.onClick(item, index);
  };
  return (
    <div className="list">
      {props.items.map((item, index) => {
        const key = props.keyExtractor(item, index);
        return (
          <div key={key} className="item" onClick={handleClick(item, index)}>
            {props.onRenderItem(item, index, props.selected)}
          </div>
        );
      })}
    </div>
  );
};
