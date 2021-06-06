const R = require("ramda");
const querystring = require("querystring");
const jsonParse = require("./json-parse");

const getIp = (event) =>
  R.path(["headers", "CF-Connecting-IP"], event) ||
  R.path(["headers", "X-Real-IP"], event) ||
  R.path(["requestContext", "identity", "sourceIp"], event);

const parseBody = (event) => {
  const { body } = event;
  if (!body) return undefined;
  if (
    R.pathEq(
      ["headers", "Content-Type"],
      "application/x-www-form-urlencoded",
      event
    )
  ) {
    return querystring.parse(body);
  }
  return jsonParse(body);
};

module.exports = R.applySpec({
  ip: getIp,
  body: parseBody,
  parameters: R.path(["pathParameters"]),
  query: R.path(["queryStringParameters"]),
});
