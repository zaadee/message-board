import sqlite3 from 'sqlite3';
import { Promise } from 'bluebird';
type SqlParam = string | number;
export class AppDao {
  db: sqlite3.Database;
  private static instance?: AppDao;
  public static getInstance(): AppDao {
    if (!AppDao.instance) {
      AppDao.instance = new AppDao();
    }
    return AppDao.instance;
  }
  private constructor() {}
  connect() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(':memory:', err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async seed() {
    await this.run(`create table channels (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name Text
            )`);
    await this.run(`create table messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                channelId integer,
                body Text,
                date integer,
                CONSTRAINT messages_fk_channelId FOREIGN KEY (channelId)
                REFERENCES channels(id)
            )`);
    await this.run(`insert into channels (name) values ('Hobbies')`);
    await this.run(`insert into channels (name) values ('Musics')`);
    await this.run(`insert into channels (name) values ('Books')`);
    await this.run(`insert into channels (name) values ('People')`);
  }

  run(sql: string, params: SqlParam[] = []): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }
  get(sql: string, params: SqlParam[] = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  all(sql: string, params: SqlParam[] = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}
