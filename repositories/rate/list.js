const storage = require("../../services/dynamoDB");

const list = async () => {
    const { storage } = list.dependencies();
    try {
        const params = {
            TableName: process.env.RATINGS_TABLE,
        };

        return storage.list(params);
    } catch (err) {
        console.log(err);
    }
};

list.dependencies = () => ({
    storage,
});

module.exports = list;