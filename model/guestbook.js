const mongoose = require("mongoose");
const _ = require("lodash");
const schema = new mongoose.Schema(
  {
    messages:{
      type:[{type: mongoose.ObjectId, ref: "Massege",required:false}]
    },
    userId: { type: mongoose.ObjectId, ref: "User", required: true }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc) => {
        return _.pick(doc, ["id",,"messages","userId"]);
      },
    },
  }
);

const Guestbook = mongoose.model("Guestbook", schema);

module.exports = Guestbook