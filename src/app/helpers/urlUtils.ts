// eslint-disable-next-line import/prefer-default-export
export const getRedirectUrl = (givenUrl:string, otherParams:string) => {
  const url = new URL(givenUrl);
  const existingQueryParams = Array.from(url.searchParams.keys());

  if (existingQueryParams.length) {
    return `${givenUrl}&${otherParams}`;
  }

  return `${givenUrl}${givenUrl.includes('?') ? '' : '?'}${otherParams}`;
};
