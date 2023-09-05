import Registration from "../models/registration.model";
import Event from "../models/event.model";

import { io } from "../index";

const create = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.body.userId;

    const eventOrganizer = await Event.findById(eventId).select("organizerId");

    const reg = new Registration({
      eventId: eventId,
      userId: userId,
      organizerId: eventOrganizer.organizerId,
    });

    const registration = await reg.save();

    const notification = {
      id: registration._id,
      eventId: registration.eventId,
      userId: registration.userId,
      email: req.user.email,
      organizerId: registration.organizerId,
    };

    io.to(registration.organizerId.toString()).emit(
      "Registration Request",
      notification
    );

    res.status(200).json({ message: "Registration successfull." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const readUserRegistrations = (req, res, next) => {
  const user = req.user;

  Registration.find({ organizerId: user._id })
    .populate("eventId userId")
    .sort({ isPending: "desc" })
    .then((data) => res.status(200).json({ registrations: data }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
};

const readRegistration = (req, res, next) => {
  const eventId = req.params.eventId;
  const userId = req.body.userId;

  Registration.findOne({ eventId: eventId, userId: userId })
    .then((data) => res.status(200).json({ registration: data }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: err.message });
    });
};

const approve = async (req, res, next) => {
  try {
    const id = req.params.registrationId;
    let reg = await Registration.findById(id);

    reg.isApproved = true;
    reg.isPending = false;

    const notification = {
      id: reg._id,
      eventId: reg.eventId,
    };

    io.to(reg.userId.toString()).emit("Registration Approved", notification);

    await reg.save();
    res.status(200).json({ message: "Registration approved successfully." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const reject = async (req, res, next) => {
  try {
    const id = req.params.registrationId;
    let reg = await Registration.findById(id);

    reg.isApproved = false;
    reg.isPending = false;

    const notification = {
      id: reg._id,
      eventId: reg.eventId,
    };

    io.to(reg.userId.toString()).emit("Registration Rejected", notification);

    await reg.save();
    res.status(200).json({ message: "Registration rejected successfully." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export default {
  create,
  readUserRegistrations,
  readRegistration,
  approve,
  reject,
};
