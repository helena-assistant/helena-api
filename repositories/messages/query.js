const storage = require("../../services/dynamoDB");

const query = async ({ main_intent }) => {
  const { storage } = query.dependencies();
  try {
    const params = {
      TableName: process.env.DIALOG_TABLE,
      KeyConditionExpression: "main_intent = :main_intent",
      ExpressionAttributeValues: {
        ":main_intent": main_intent,
      },
    };

    return storage.query(params);
  } catch (err) {
    console.log(err);
  }
};

query.dependencies = () => ({
  storage,
});

module.exports = query;
