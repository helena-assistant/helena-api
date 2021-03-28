const parseRequest = require("../utils/parse-request");
const responseHandler = require("../utils/response-handler");
const WatsonService = require("../services/watson");

const handler = async (event) => {
  const deps = handler.dependencies();
  const { message, sessionId } = deps.parseRequest(event);

  const watsonResponse = await WatsonService.sendAssistantMessage(
    message,
    sessionId
  );

  return deps.responseHandler(200, watsonResponse);
};

handler.dependencies = () => ({
  parseRequest,
  responseHandler,
  dynamoDb,
});

module.exports = { handler };
