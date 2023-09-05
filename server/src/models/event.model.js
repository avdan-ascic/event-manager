import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required!",
    maxLength: [55, "Title must not exceed more than 55 characters!"],
  },
  description: {
    type: String,
    trim: true,
    required: "Description is required",
    maxLength: [100, "Description must not exceed more than 100 characters!"],
  },
  price: {
    type: Number,
    get: (v) => parseFloat(v).toFixed(2),
    set: (v) => parseFloat(v).toFixed(2),
    min: [0, "Price can't be negative number!"],
    required: "Price is required!",
  },
  date: {
    type: Date,
    required: "Date is required!",
    validate: {
      validator: function (value) {
        const yesterday = new Date(
          new Date().setDate(new Date().getDate() - 1)
        );
        return value > yesterday;
      },
      message: "You can't use past dates!",
    },
  },
  category: {
    type: String,
    enum: ["Course", "Meetup"],
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

export default mongoose.model("event", eventSchema);
