import { AppDao } from 'dao';

export class Service {
  protected dao: AppDao = AppDao.getInstance();
}
