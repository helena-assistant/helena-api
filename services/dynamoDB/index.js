const AWS = require("aws-sdk");

class DynamoDB {
  dynamoDb = null;

  constructor() {
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
  }

  async create(item) {
    const dateISOString = new Date().toISOString();
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        ...item,
        createdAt: dateISOString,
        updatedAt: dateISOString,
      },
    };

    return this.dynamoDb.put(params);
  }
}

module.exports = new DynamoDB();
