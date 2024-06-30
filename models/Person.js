const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    work: {
      type: String,
      enum: ["chef", "manager", "waiter"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { collection: "People" }
);

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
