const parseRequest = require("../utils/parse-request");
const responseHandler = require("../utils/response-handler");
const getMessagesByIntent = require("../repositories/messages/query");

const handler = async (event) => {
  const deps = handler.dependencies();
  const {
    query: { mainIntent },
  } = deps.parseRequest(event);

  console.log(mainIntent);

  const response = await deps.getMessagesByIntent({
    main_intent: mainIntent,
  });

  return deps.responseHandler(200, response);
};

handler.dependencies = () => ({
  parseRequest,
  responseHandler,
  getMessagesByIntent,
});

module.exports = { handler };
