import express from "express";
import passport from "passport";

import regCtrl from "../controllers/registration.controller";

const router = express.Router();

router
  .route("/api/registration/:eventId")
  .post(passport.authenticate("jwt"), regCtrl.create);
router
  .route("/api/registration")
  .get(passport.authenticate("jwt"), regCtrl.readUserRegistrations);
router
  .route("/api/registration/read/:eventId")
  .post(passport.authenticate("jwt"), regCtrl.readRegistration);
router
  .route("/api/registration/:registrationId/approve")
  .get(passport.authenticate("jwt"), regCtrl.approve);
router
  .route("/api/registration/:registrationId/reject")
  .get(passport.authenticate("jwt"), regCtrl.reject);

export default router;
