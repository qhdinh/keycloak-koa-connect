import { Context } from 'koa';
/**
 * Created by zhangsong on 2018/8/9.
 */
export default function (keycloak: any, logoutUrl: string): (ctx: Context, next: () => Promise<void>) => Promise<void>;
