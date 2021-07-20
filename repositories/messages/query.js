const storage = require("../../services/dynamoDB");

const query = async ({ main_intent }) => {
  const { storage } = query.dependencies();
  try {
    const params = {
      TableName: process.env.MESSAGES_TABLE,
      KeyConditionExpression:
        "main_intent = :main_intent AND created_at < :created_at",
      ExpressionAttributeValues: {
        ":main_intent": main_intent,
        ":created_at": new Date().toISOString(),
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
