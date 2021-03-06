const parseRequest = require("../utils/parse-request");
const AWS = require("aws-sdk");
const WatsonService = require("../services/watson");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context, callback) => {
  const { message } = parseRequest(event);
  const sessionId = await WatsonService.getSession();
  const watsonResponse = await WatsonService.sendAssistantMessage(
    message,
    sessionId
  );

  const response = {
    statusCode: 200,
    body: JSON.stringify(watsonResponse),
  };
  callback(null, response);
};
