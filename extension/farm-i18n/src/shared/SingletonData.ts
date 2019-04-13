export interface ILocalizeResult {
  localize: string;
  result: string;
}

export interface IData {
  key: string;
  id: string;
  origin: string;
  tags: string[];
  result: string;
  localizes: string[];
  localizesResult: ILocalizeResult[];
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

  public toArray(): IData[] {
    const result: IData[] = [];
    this.dataMap.forEach((value: IData) => {
      result.push(value);
    });
    return result;
  }
}
