const config = require('../config');
const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect(config.mongo.uri,  { useNewUrlParser: true,  useUnifiedTopology: true });
        console.log("My Mongoose is connected!");
    } catch (error) {
        console.error("Error connecting to mongo");
        console.error(error);
    }
}

module.exports = {connect};