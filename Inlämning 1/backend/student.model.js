const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Student = new Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    gata: {
      type: String,
    },
    postnummer: {
      type: String,
    },
    ort: {
      type: String,
    },
  },
});

module.exports = mongoose.model("Student", Student);
