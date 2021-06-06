const parseRequest = require("../utils/parse-request");
const responseHandler = require("../utils/response-handler");
const watsonService = require("../services/watson");
const createMessage = require("../repositories/messages/create");

const handler = async (event) => {
  const deps = handler.dependencies();
  const {
    body: { message, sessionId },
  } = deps.parseRequest(event);

  const watsonResponse = await deps.watsonService.sendAssistantMessage(
    message,
    sessionId
  );

  const features = deps.watsonService.extractFeatures(watsonResponse);

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
  watsonService,
});

module.exports = { handler };
