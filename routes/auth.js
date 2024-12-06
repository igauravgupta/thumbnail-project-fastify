const {
  register,
  login,
  forgetPassword,
  resetPassword,
} = require("../controllers/authController");

const router = (fastify, options, done) => {
  fastify.post("/register", register);
  fastify.post("/login", login);
  fastify.post("/forget-password", forgetPassword);
  fastify.post("/reset-password:token", resetPassword);
  done();
};

module.exports = router;
