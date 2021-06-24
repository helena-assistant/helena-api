const AWS = require("aws-sdk");

class DynamoDB {
  dynamoDb = null;

  constructor() {
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
  }

  async create(params) {
    return new Promise((resolve, reject) => {
      this.dynamoDb.put(params, (error) => {
        if (error) {
          console.error(error);
          reject(null, {
            statusCode: error.statusCode || 500,
            headers: { "Content-Type": "text/plain" },
            body: "Couldn't create the item. Some error occurred while saving",
          });
          return;
        }

        const response = {
          statusCode: 201,
          body: JSON.stringify(params.Item),
        };

        resolve(response);
      });
    });
  }

  async query(params) {
    return new Promise((resolve, reject) => {
      this.dynamoDb.query(params, (error, data) => {
        if (error) {
          console.error(error);
          reject(null, {
            statusCode: error.statusCode || 500,
            headers: { "Content-Type": "text/plain" },
            body: "Some error occurred while listing",
          });
          return;
        }

        const response = {
          statusCode: 200,
          body: data.Items,
        };

        resolve(response);
      });
    });
  }

  async list(params) {
    return new Promise((resolve, reject) => {
      this.dynamoDb.scan(params, (error, data) => {
        if (error) {
          console.error(error);
          reject(null, {
            statusCode: error.statusCode || 500,
            headers: { "Content-Type": "text/plain" },
            body: "Some error occurred while scanning",
          });
          return;
        }

        const response = {
          statusCode: 200,
          body: data.Items,
        };

        resolve(response);
      });
    });
  }
}

module.exports = new DynamoDB();
