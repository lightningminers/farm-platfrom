import { storageSet } from "./utils";

const FARM_I18N_STORAGE_KEY = "FARM_I18N_STORAGE_KEY";

export interface IData {
  key: string;
  id: string;
  name: string;
  origin: string;
  tag: string;
  result: string;
  localizes: string[];
  localizesResult: string;
}

export default class SingletonData {

  static singleton: SingletonData | undefined;
  static sharedInstance = () => {
    if (!SingletonData.singleton) {
      SingletonData.singleton = new SingletonData();
    }
    return SingletonData.singleton;
  }

  public dataMap: Map<string, IData>
  constructor(){
    this.dataMap = new Map();
  }

  public parseArray(d: IData[]){
    for (const iterator of d) {
      this.dataMap.set(iterator.id, iterator);
    }
  }

  public is(key: string) {
    return this.dataMap.has(key);
  }

  public getData(key: string){
    return this.dataMap.get(key);
  }

  public length() {
    return this.dataMap.size;
  }

  public setData(key: string, data: IData){
    this.dataMap.set(key, data);
  }

  public removeData(key: string) {
    this.dataMap.delete(key);
  }

  public toArray(): IData[] {
    const result: IData[] = [];
    this.dataMap.forEach((value: IData) => {
      result.push(value);
    });
    return result;
  }

  public saveStorage(){
    const result = this.toArray();
    storageSet({
      [FARM_I18N_STORAGE_KEY]: result
    });
  }
}
