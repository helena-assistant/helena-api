const storage = require("../../services/dynamoDB");

const create = async ({
  sessionId,
  userMessage,
  wasAnswered,
  intent,
  confidence,
  intents,
  entities,
  suggestions,
}) => {
  const { storage } = create.dependencies();
  return storage.create({
    sessionId,
    userMessage,
    wasAnswered,
    intent,
    confidence,
    intents,
    entities,
    suggestions,
  });
};

create.dependencies = () => ({
  storage,
});

module.exports = create;
