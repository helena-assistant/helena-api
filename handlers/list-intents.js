const responseHandler = require("../utils/response-handler");
const listIntents = require("../repositories/intents/list");

const handler = async () => {
  const deps = handler.dependencies();

  const response = await deps.listIntents();

  return deps.responseHandler(200, response);
};

handler.dependencies = () => ({
  responseHandler,
  listIntents,
});

module.exports = { handler };
