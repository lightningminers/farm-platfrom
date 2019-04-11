export interface IConfig {
    origin: string;
    localizes: string[];
    output: {
        filename: string;
    };
    platfrom: string;
    baidu?: {
        appId: string;
        appSecret: string;
    };
    google?: {
        projectId: string;
    };
}
export declare const filterOrigin: (origin: string, target: any) => any;
export declare const format: (data: any, space?: number) => string;
export declare const baiduPlatfrom: (i18nJSON: any, localizes: string[], config: IConfig) => Promise<any>;
