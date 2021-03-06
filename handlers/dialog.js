const parseRequest = require("../utils/parse-request");
const AWS = require("aws-sdk");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  const { message } = parseRequest(event);

  const response = {
    statusCode: 200,
    body: JSON.stringify(message),
  };
  callback(null, response);
};
