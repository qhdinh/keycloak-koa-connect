"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by zhangsong on 2018/8/9.
 */
const bearerStore = {
    get(ctx) {
        const { authorization } = ctx.request.headers;
        if (authorization) {
            if (authorization.indexOf('bearer ') === 0 || authorization.indexOf('Bearer ') === 0) {
                const accessToken = authorization.substring(7);
                return {
                    access_token: accessToken,
                };
            }
        }
    },
};
exports.default = bearerStore;
//# sourceMappingURL=bearer-store.js.map