
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ems");

const Employee = mongoose.model("Employee", {
  name: String,
  role: String,
  salary: Number,
});

app.get("/employees", async (req, res) => {
  res.json(await Employee.find());
});

app.post("/employees", async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

app.delete("/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

app.listen(5000, () => console.log("Server started"));