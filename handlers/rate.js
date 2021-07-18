const responseHandler = require("../utils/response-handler");
const parseRequest = require("../utils/parse-request");
const updateRating = require("../repositories/rate/update");

const handler = async (event) => {
  const deps = handler.dependencies();
  const {
    body: { rate },
  } = deps.parseRequest(event);

  if (isNaN(rate)) {
    return responseHandler(400, { message: "rate is not a number" });
  }

  if (rate < 1 || rate > 5) {
    return responseHandler(400, {
      message: "rate is invalid, please enter a value between 1 and 5",
    });
  }

  await deps.updateRating({ rate });

  return responseHandler(200, { message: "OK" });
};

handler.dependencies = () => ({
  updateRating,
  parseRequest,
});

module.exports = { handler };
