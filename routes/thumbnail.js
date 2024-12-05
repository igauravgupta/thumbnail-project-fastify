const {
  createThumbnail,
  deleteThumbnail,
  deleteAllThumbnails,
  getThumbnail,
  getThumbnails,
  updateThumbnail,
} = require("../controllers/thumbnailController");

const router = (fastify, options, done) => {
  fastify.post(
    "/create",
    { onRequest: [fastify.authenticate] },
    createThumbnail
  );
  fastify.get("/", { onRequest: [fastify.authenticate] }, getThumbnails);
  fastify.get("/:id", { onRequest: [fastify.authenticate] }, getThumbnail);
  fastify.put("/:id", { onRequest: [fastify.authenticate] }, updateThumbnail);
  fastify.delete(
    "/:id",
    { onRequest: [fastify.authenticate] },
    deleteThumbnail
  );
  fastify.delete(
    "/",
    { onRequest: [fastify.authenticate] },
    deleteAllThumbnails
  );
};

module.exports = router;
