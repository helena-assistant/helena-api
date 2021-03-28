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
  return storage.create({
    user_message,
    session_id,
    main_intent,
    main_intent_confidence,
    was_answered,
    response_type,
    suggestions,
    intents,
    entities,
  });
};

create.dependencies = () => ({
  storage,
});

module.exports = create;
