import { io as create } from "socket.io-client";
import { Message } from "./models";
import { AppDispatch } from "../app";
import { updateMessage } from "./board";
import { v4 as uuid } from "uuid";

export class Device {
  static readonly ID: string = uuid();
}

export const io = create(process.env.REACT_APP_REMOTE as string, {});

export const configurePushMessages = (dispatch: AppDispatch) => {
  io.on("message", (message) => {
    messageHandler(message, dispatch);
  });
};

const messageHandler = (
  message: Message & { _device: string },
  dispatch: AppDispatch
) => {
  const senderDevice = Device.ID === message._device;
  if (!senderDevice) {
    dispatch(updateMessage(message));
  }
};
