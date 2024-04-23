
import images from "../controllers/image.controller.js";
import express from "express";
const imageRouter=express.Router();
import upload from "../middlewares/upload.image.js";

imageRouter.route("/image").post(upload.single("image"),images.image);

export default imageRouter;
