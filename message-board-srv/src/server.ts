import { ChannelController, MessageController } from './controllers';
import { AppDao } from './dao';
import { App } from './app';

const controllers = [new ChannelController(), new MessageController()];

(async function () {
  await AppDao.getInstance().connect();
  await AppDao.getInstance().seed();

  const app = new App(controllers);
  app.listen();
})();
