const responseHandler = require("../utils/response-handler");
const watsonService = require("../services/watson");

const handler = async () => {
  const deps = handler.dependencies();
  const sessionId = await deps.watsonService.getSession();

  return responseHandler(200, { sessionId });
};

handler.dependencies = () => ({
  watsonService,
});

module.exports = { handler };
