const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv");

dotenv.config();

// register plugins
fastify.register(require("@fastify/sensible"));
fastify.register(require("@fastify/multipart"));
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "uploads"),
  prefix: "/uploads/",
});
fastify.register(require("@fastify/cors"), {
  // put your options here
});

//custom plugins
fastify.register(require("./plugins/mongodb"));
fastify.register(require("./plugins/jwt"));

//register routes
fastify.register(require("./routes/auth"), { prefix: "/api/auth" });
fastify.register(require("./routes/thumbnail"), { prefix: "/api/thumbnail" });

const start = async () => {
  try {
    const port = process.env.PORT;
    await fastify.listen({ port });
    fastify.log.info(`Server is running on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
