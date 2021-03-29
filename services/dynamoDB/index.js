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

    return new Promise((resolve, reject) => {
      this.dynamoDb.put(params, (error) => {
        if (error) {
          console.error(error);
          reject(null, {
            statusCode: error.statusCode || 501,
            headers: { "Content-Type": "text/plain" },
            body: "Couldn't create the item. Some error occurred while saving",
          });
          return;
        }

        const response = {
          statusCode: 200,
          body: JSON.stringify(params.Item),
        };
        resolve(response);
      });
    });
  }
}

module.exports = new DynamoDB();
