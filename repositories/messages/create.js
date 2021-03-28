const storage = require("../../services/dynamoDB");
const { uuid } = require("uuidv4");

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
  const { storage, uuid } = create.dependencies();
  return storage.create({
    message_id: uuid(),
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
  uuid,
});

module.exports = create;
