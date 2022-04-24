"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedirectUrl = void 0;
// eslint-disable-next-line import/prefer-default-export
const getRedirectUrl = (givenUrl, otherParams) => {
    const url = new URL(givenUrl);
    const existingQueryParams = Array.from(url.searchParams.keys());
    if (existingQueryParams.length) {
        return `${givenUrl}&${otherParams}`;
    }
    return `${givenUrl}${givenUrl.includes('?') ? '' : '?'}${otherParams}`;
};
exports.getRedirectUrl = getRedirectUrl;
