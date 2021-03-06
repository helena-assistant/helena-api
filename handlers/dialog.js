import { parseRequest } from "../utils/parse-request";
import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  const { message } = parseRequest(event);

  const response = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  callback(null, response);
};
