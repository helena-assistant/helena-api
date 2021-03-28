const parseRequest = require("../utils/parse-request");
const responseHandler = require("../utils/response-handler");
const WatsonService = require("../services/watson");
const createMessage = require("../repositories/messages");

const handler = async (event) => {
  const deps = handler.dependencies();
  const { message, sessionId } = deps.parseRequest(event);

  const watsonResponse = await WatsonService.sendAssistantMessage(
    message,
    sessionId
  );

  const features = WatsonService.extractFeatures(watsonResponse);

  await deps.createMessage({
    user_message: message,
    session_id: sessionId,
    ...features,
  });

  return deps.responseHandler(200, watsonResponse);
};

handler.dependencies = () => ({
  parseRequest,
  responseHandler,
  createMessage,
});

module.exports = { handler };
