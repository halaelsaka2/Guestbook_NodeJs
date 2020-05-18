const mongoose = require("mongoose");
const _ = require("lodash");
const messageSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    reply: {
      type: String,
    },
    userId: { type: mongoose.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc) => {
        return _.pick(doc, ["id", "value","reply","userId"]);
      },
    },
  }
);

const Massege = mongoose.model("Massege", messageSchema);

module.exports = Massege;
