// takes a URL, and returns key and value object
export const getQryParams = (url: string): { [param: string]: string } => {
  const qry = url.split("?");
  const params: { [param: string]: string } = {};
  if (qry[1]) {
    qry[1].split("&").forEach(param => {
      const strArr = param.split("=");
      const name = strArr[0];
      const val = strArr[1];
      params[name] = val;
    });
  }
  return params;
};

// generates a random 11 character string
export const randomString = () => {
  return Math.random()
    .toString(36)
    .slice(2);
};
