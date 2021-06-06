const storage = require("../../services/dynamoDB");

const query = async ({ main_intent }) => {
  const { storage } = query.dependencies();
  try {
    return storage.query(main_intent);
  } catch (err) {
    console.log(err);
  }
};

query.dependencies = () => ({
  storage,
});

module.exports = query;
