import { IData } from "./SingletonData";

export const createTab = (url: string): Promise<chrome.tabs.Tab> => {
  return new Promise((resolve) => {
    chrome.tabs.create({
      url,
    }, (tab: chrome.tabs.Tab) => {
      resolve(tab);
    });
  });
}

export const getURL = (url: string): string => {
  return chrome.extension.getURL(url);
}

export const getMessage = (key: string): string => {
  return chrome.i18n.getMessage(key);
}

export const storageGet = (key: string): Promise<any> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (items: any) => {
      resolve(items);
    });
  });
}

export const storageRemove = (key: string): Promise<number> => {
  return new Promise((resolve) => {
    chrome.storage.local.remove(key, () => {
      resolve(0);
    });
  });
}

export const storageSet = (val: any): Promise<number> => {
  return new Promise((resolve) => {
    chrome.storage.local.set(val, () => {
      resolve(0);
    });
  });
}

export const extractText = (data: IData | undefined) => {
  if (data) {
    let r = '';
    const { origin } = data;
    const result = JSON.parse(data.result);
    const keys = Object.keys(result);
    for (const iterator of keys) {
      const t = result[iterator][origin];
      let w = '';
      if (t) {
        w = `${t["message"]}\n`
      } else {
        w = `[icepy]\n`
      }
      r += w;
    }
    return r;
  }
  return "";
}
