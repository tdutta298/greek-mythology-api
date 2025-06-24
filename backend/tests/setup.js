const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

module.exports.connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
};

module.exports.cleanup = async () => {
  await mongoose.connection.dropDatabase();
};

module.exports.disconnect = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};
