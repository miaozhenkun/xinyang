import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * 持久化存储服务 KEY/VALUE
 */
@Injectable()
export class StorageKVService {

  constructor(private storage: Storage) { }

  /**
   * 获取键对应信息
   * @param key 键
   */
  get(key: string) {
    return this.storage.get(key);
  }

  /**
   * 保存键值对信息
   * @param key 键
   * @param data 值 
   */
  set(key: string, data: any) {
    return this.storage.set(key, data);
  }

  /**
   * 移除键
   * @param key 键
   */
  remove(key: string) {
    return this.storage.remove(key);
  }

}
