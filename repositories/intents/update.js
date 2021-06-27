const storage = require("../../services/dynamoDB");

const update = async ({ main_intent, was_answered }) => {
  const { storage } = update.dependencies();

  const params = {
    TableName: process.env.INTENTS_TABLE,
    Key: {
      intent: main_intent,
    },
    UpdateExpression:
      "ADD #main_intent_counter :inc_main_intent, #was_answered_counter :inc_was_answered",
    ExpressionAttributeValues: {
      ":inc_main_intent": 1,
      ":inc_was_answered": was_answered ? 1 : 0,
    },
    ExpressionAttributeNames: {
      "#main_intent_counter": "counter",
      "#was_answered_counter": "was_answered",
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
