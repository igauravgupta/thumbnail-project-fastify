const { User } = require("../models/user");
const bcrypt = require("bcrypt");

exports.register = async (request, reply) => {
  try {
    const { name, email, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    reply.code(201).send({ message: "User registered successfully" });
  } catch (error) {
    reply.send(error);
  }
};

exports.login = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      reply.code(401).send({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      reply.code(401).send({ message: "Invalid email or password" });
    }
    const token = fastify.jwt.sign({ id: user._id });
    reply.code(200).send({ token });
  } catch (error) {
    reply.send(error);
  }
};

exports.forgetPassword = async (request, reply) => {
  try {
    const { email } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
      reply.notFound("User not found");
    }
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    const resetUrl = `http://localhost:${process.env.PORT}/api/auth/reset-password/${resetToken}`;
    reply.code(200).send({ resetUrl });
  } catch (error) {
    reply.send(error);
  }
};

exports.resetPassword = async (request, reply) => {
  try {
    const { resetToken } = request.params;
    const { newPassword } = request.body;
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      reply.notFound("Invalid or expired reset token");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    reply.code(200).send({ message: "Password reset successful" });
  } catch (error) {
    reply.send(error);
  }
};