const storage = require("../../services/dynamoDB");

const update = async ({ rate }) => {
  const { storage } = update.dependencies();

  const params = {
    TableName: process.env.RATINGS_TABLE,
    Key: {
      pk: Number(rate),
    },
    UpdateExpression: "ADD #counter :counter",
    ExpressionAttributeValues: {
      ":counter": 1,
    },
    ExpressionAttributeNames: {
      "#counter": "counter",
    },
  };

  try {
    return storage.update(params);
  } catch (err) {
    console.log(err);
  }
};

update.dependencies = () => ({
  storage,
});

module.exports = update;
