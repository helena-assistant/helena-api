const jsonParse = require("./json-parse");

const parseRequest = (event) => {
  const { body } = event;
  if (!body) return undefined;
  return jsonParse(body);
};

module.exports = parseRequest;
