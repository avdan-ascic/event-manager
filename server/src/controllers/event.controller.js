import Event from "../models/event.model";
import Registration from "../models/registration.model";

const create = (req, res, next) => {
  let eventObj = JSON.parse(req.body.event);

  eventObj.price = parseFloat(eventObj.price).toFixed(2);

  let event = new Event(eventObj);

  if (req.file === undefined) {
    return res.status(400).json({ error: "Image is required!" });
  } else {
    event.image.data = req.file.buffer;
    event.image.contentType = req.file.mimetype;
  }

  event
    .save()
    .then(() => res.status(200).json({ message: "Event added successfully." }))
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

const readAll = (req, res, next) => {
  Event.find({})
    .then((events) => res.status(200).json({ events: events }))
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

const readByCat = (req, res, next) => {
  Event.find({ category: req.parmas.cat })
    .then((events) => res.status(200).json({ events: events }))
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

const readByUser = (req, res, next) => {
  Event.find({ userId: req.params.userId })
    .then((events) => res.status(200).json({ events: events }))
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

const readById = (req, res, next) => {
  Event.findById(req.params.eventId)
    .then((event) => res.status(200).json({ event: event }))
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: err.message });
    });
};

const remove = async (req, res, next) => {
  try {
    const id = req.params.eventId;

    await Event.findByIdAndDelete(id);
    await Registration.deleteMany({ eventId: id });

    return res.status(200).json({ message: "Event deleted successfully." });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

export default { create, readAll, readByCat, readByUser, readById, remove };
