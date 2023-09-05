import express from "express";
import passport from "passport";
import multer from "multer";

import eventCtrl from "../controllers/event.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router
  .route("/api/events/create")
  .post(passport.authenticate("jwt"), upload.single("image"), eventCtrl.create);
router
  .route("/api/events/read-all")
  .get(passport.authenticate("jwt"), eventCtrl.readAll);
router
  .route("/api/events/:cat")
  .get(passport.authenticate("jwt"), eventCtrl.readByCat);
router
  .route("/api/events/user/:userId")
  .get(passport.authenticate("jwt"), eventCtrl.readByUser);
router
  .route("/api/events/event/:eventId")
  .get(passport.authenticate("jwt"), eventCtrl.readById)
  .delete(passport.authenticate("jwt"), eventCtrl.remove);

export default router;
