import mongoose from "mongoose";

const registrationSchema = mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  isApproved: {
    type: Boolean,
  },
  isPending: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("registration", registrationSchema);
