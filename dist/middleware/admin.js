"use strict";
/**
 * Created by zhangsong on 2018/8/9.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function adminLogout(ctx, keycloak) {
    let data = '';
    ctx.req.on('data', (d) => {
        data += d.toString();
    });
    ctx.req.on('end', () => {
        const parts = data.split('.');
        const payload = JSON.parse(new Buffer(parts[1], 'base64').toString());
        if (payload.action === 'LOGOUT') {
            const sessionIDs = payload.adapterSessionIds;
            if (!sessionIDs) {
                keycloak.grantManager.notBefore = payload.notBefore;
                return ctx.response.body('ok');
            }
            if (sessionIDs && sessionIDs.length > 0) {
                let seen = 0;
                sessionIDs.forEach((id) => {
                    keycloak.unstoreGrant(id);
                    ++seen;
                    if (seen === sessionIDs.length) {
                        return ctx.response.body('ok');
                    }
                });
            }
            else {
                return ctx.response.body('ok');
            }
        }
    });
}
function adminNotBefore(ctx, keycloak) {
    let data = '';
    ctx.req.on('data', (d) => {
        data += d.toString();
    });
    ctx.req.on('end', () => {
        const parts = data.split('.');
        const payload = JSON.parse(new Buffer(parts[1], 'base64').toString());
        if (payload.action === 'PUSH_NOT_BEFORE') {
            keycloak.grantManager.notBefore = payload.notBefore;
            ctx.response.body('ok');
        }
    });
}
function default_1(keycloak, adminUrl) {
    let url = adminUrl;
    if (url[url.length - 1] !== '/') {
        url = url + '/';
    }
    const urlLogout = url + 'k_logout';
    const urlNotBefore = url + 'k_push_not_before';
    return function adminRequest(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (ctx.req.url) {
                case urlLogout:
                    adminLogout(ctx, keycloak);
                    break;
                case urlNotBefore:
                    adminNotBefore(ctx, keycloak);
                    break;
                default:
                    return yield next();
            }
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=admin.js.map