const { Thumbnail } = require("../models/thumbnail");
const path = require("path");
const fs = require("fs");
const { pipeline } = require("stream");
const util = require("util");
const pipelein_async = util.promisify(pipeline);

exports.createThumbnail = async (request, reply) => {
  try {
    const parts = request.parts();
    let feilds = {};
    let filename;
    for await (const part of parts) {
      if (part.file) {
        filename = `${Date.now()}-${part.filename}`;
        const saveTo = path.join(__dirname, "../uploads", filename);
        await pipelein_async(part.file, fs.createWriteStream(saveTo));
      } else {
        fields[part.filename] = part.value;
      }
    }
    const thumbnail = await Thumbnail.create({
      user: request.user.id,
      videoName: fields.videoName,
      version: fields.version,
      thumbnail: filename,
      paid: fields.paid,
    });
    reply.code(201).send(thumbnail);
  } catch (error) {
    reply.send(error);
  }
};

exports.getThumbnails = async (request, reply) => {
  try {
    const thumbnails = await Thumbnail.find({ user: request.user.id });
    reply.send(thumbnails);
  } catch (error) {
    reply.send(error);
  }
};

exports.getThumbnail = async (request, reply) => {
  try {
    const thumbnail = await Thumbnail.findOne({
      user: request.user.id,
      _id: request.params.id,
    });
    if (!thumbnail) {
      reply.notFound("thumbnail not found");
    }
    reply.send(thumbnail);
  } catch (error) {
    reply.send(error);
  }
};

exports.updateThumbnail = async (request, reply) => {
  try {
    const thumbnail = await Thumbnail.findOneAndUpdate(
      { _id: request.params.id, user: request.user.id },
      request.body,
      { new: true }
    );
    if (!thumbnail) {
      reply.notFound("thumbnail not found");
    }
    reply.send(thumbnail);
  } catch (error) {
    reply.send(error);
  }
};

exports.deleteThumbnail = async (request, reply) => {
  try {
    const thumbnail = await Thumbnail.findOneAndDelete({
      _id: request.params.id,
      user: request.user.id,
    });
    if (!thumbnail) {
      reply.notFound("thumbnail not found");
    }
    const filePath = path.join(__dirname, "../uploads", thumbnail.thumbnail);
    fs.unlinkSync(filePath);
    reply.send({ message: "thumbnail deleted" });
  } catch (error) {
    reply.send(error);
  }
};

exports.deleteAllThumbnails = async (request, reply) => {
  try {
    const thumbnails = await Thumbnail.find({ user: request.user.id });
    await Thumbnail.deleteMany({ user: request.user.id });
    for (const thumbnail of thumbnails) {
      const filePath = path.join(__dirname, "../uploads", thumbnail.thumbnail);
      fs.unlinkSync(filePath);
    }
    reply.send({ message: `${thumbnails.length} thumbnails deleted` });
  } catch (error) {
    reply.send(error);
  }
};
