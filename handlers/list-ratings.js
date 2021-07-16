const responseHandler = require("../utils/response-handler");
const listRatings = require("../repositories/rate/list");

const handler = async () => {
    const deps = handler.dependencies();

    const response = await deps.listRatings();

    return deps.responseHandler(200, response);
};

handler.dependencies = () => ({
    responseHandler,
    listRatings,
});

module.exports = { handler };