const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const studentRoutes = express.Router();
const PORT = 4000;

let Student = require("./student.model");

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/studenter", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//Get all students and find by student
studentRoutes.route("/").get(function (req, res) {
  var name = req.query.name;
  if (name) {
    Student.find({ name: name }, function (err, student) {
      res.status(200).json(student);
    });
  } else {
    Student.find(function (err, studenter) {
      if (err) {
        next(err);
      } else {
        res.status(200).json(studenter);
      }
    });
  }
});

//Get student by id
studentRoutes.route("/:id").get(function (req, res, next) {
  let id = req.params.id;
  Student.findById(id, function (err, student) {
    if (err) {
      next(err);
    } else {
      res.status(200).json(student);
    }
  });
});

//PUT create, update and no change
studentRoutes.route("/:id").put(function (req, res, next) {
  Student.updateOne(
    { _id: req.params.id },
    {
      email: req.body.email,
      name: req.body.name,
      address: {
        gata: req.body.address.gata,
        postnummer: req.body.address.postnummer,
        ort: req.body.address.ort,
      },
    },
    {
      new: true,
      upsert: true,
      runvalidators: true,
    }
  )
    .then((status) => {
      console.log("status: ", status);
      if (status.upserted) {
        res.status(201);
      } else if (status.nModified) {
        res.status(200);
      } else {
        res.status(204);
      }
      Student.findById(req.params.id).then((student) => {
        res.send(student);
      });
    })
    .catch((error) => next(error));
});

//POST Create new student
studentRoutes.route("/").post(function (req, res, next) {
  let student = new Student(req.body);
  student
    .save()
    .then((student) => {
      res.status(201).json(student);
    })
    .catch((err) => {
      next(err);
    });
});

//DELETE by id
studentRoutes.route("/:id").delete((req, res, next) => {
  Student.findByIdAndDelete(req.params.id)
    .then((deleted) => {
      if (deleted) return res.send(deleted).status(200);
      res.sendStatus(204);
    })
    .catch((error) => next(error));
});

app.use("/studenter", studentRoutes);

app.use((req, res, next) => {
  const err = new Error();
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(error.statusCode || error.status || 500).send({ error: error });
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
