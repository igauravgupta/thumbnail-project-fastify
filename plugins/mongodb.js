const mongoose = require("mongoose");
const fp = require("fastify-plugin");

module.exports = fp(async (fastify, options) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    fastify.decorate("mongodb", mongoose.connection);
    fastify.log.info("MongoDB Connected");
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
});
