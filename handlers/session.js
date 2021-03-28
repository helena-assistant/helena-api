const parseRequest = require("../utils/parse-request");
const responseHandler = require("../utils/response-handler");
const WatsonService = require("../services/watson");

module.exports.handler = async (event) => {
  const { message } = parseRequest(event);
  const sessionId = await WatsonService.getSession();

  const watsonResponse = await WatsonService.sendAssistantMessage(
    message,
    sessionId
  );

  return responseHandler(200, watsonResponse);
};
