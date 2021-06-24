const storage = require("../../services/dynamoDB");

const create = async ({
  user_message,
  session_id,
  main_intent,
  main_intent_confidence,
  was_answered,
  response_type,
  suggestions,
  intents,
  entities,
}) => {
  const { storage } = create.dependencies();

  const dateISOString = new Date().toISOString();

  const params = {
    TableName: process.env.DIALOG_TABLE,
    Item: {
      user_message,
      session_id,
      main_intent,
      main_intent_confidence,
      was_answered,
      response_type,
      suggestions,
      intents,
      entities,
      createdAt: dateISOString,
      updatedAt: dateISOString,
    },
  };

  try {
    return storage.create(params);
  } catch (err) {
    console.log(err);
  }
};

create.dependencies = () => ({
  storage,
});

module.exports = create;
