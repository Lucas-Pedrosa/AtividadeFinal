const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGOURI);

module.exports = client;
