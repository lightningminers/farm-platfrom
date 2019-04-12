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
