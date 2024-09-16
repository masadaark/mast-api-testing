import { Pool } from 'pg';
import Cfg from '../class/config.class';
import StorageLogic from '../logic/storage.logic';
import ResClass from '../class/response.class';

class PgProtocol {
  private static _pool: Pool;

  static Connect(): void {
    this._pool = new Pool({
      ...Cfg.appSetting.pgDB,
      max: 10,
      connectionTimeoutMillis: 1000,
      idleTimeoutMillis: 1000,
    });
  }
  static async Query(sql: string): Promise<void> {
    try {
      const queryResult = (await this._pool.query(StorageLogic.RepStrVar(sql))).rows;
      ResClass.Query = queryResult;
      return;
    } catch (err) {
      throw new Error(`err: ${err} SQL: ${sql}`);
    }
  }
}

export default PgProtocol;
