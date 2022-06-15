const mongoose = require("mongoose");

const employeesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "User",
    },
    name: {
      type: "String",
      required: [true, "Please add a name"],
    },
    gender: {
      type: "String",
      required: [true, "Please add an gender"],
      enum: ["Male", "Female", "male", "female"],
    },
    age: {
      type: "String",
      required: [true, "Please add an age"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employees", employeesSchema);
