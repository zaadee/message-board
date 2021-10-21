import * as socket from 'socket.io';

export class PushService {
  private static instance?: PushService;
  public static getInstance(): PushService {
    if (!PushService.instance) {
      PushService.instance = new PushService();
    }
    return PushService.instance as PushService;
  }
  private io: socket.Server;
  private constructor() {}

  use(srv: socket.Server) {
    this.io = srv;
  }
  broadcastMessage<T>(message: T, deviceId: string) {
    this.io.emit('message', { ...message, _device: deviceId });
  }
}
