const parseQueryString = (url) => {
  const dict = {};

  const start = url.indexOf("?");

  if (start === -1) return dict;

  const queryString = url.substring(start + 1);
  const parsed = queryString.split("&");

  parsed.forEach((pair) => {
    const [key, value] = pair.split("=");
    dict[key] = value;
  });

  return dict;
};

module.exports = { parseQueryString };
