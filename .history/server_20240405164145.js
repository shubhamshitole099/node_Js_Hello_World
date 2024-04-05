const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

// Update the MongoDB Atlas connection string
const uri = "mongodb+srv://root:root@devcreate.nsob8ua.mongodb.net/employee?retryWrites=true&w=majority";
";
const dbName = 'employee';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const employeeSchema = new mongoose.Schema({
  name: String,
  mobile: String
});

const Employee = mongoose.model('Employee', employeeSchema);

app.use(bodyParser.json());

app.post('/add', async (req, res) => {
  try {
    const demoData = [
      { "name": "John Doe", "mobile": "1234567890" },
      { "name": "Jane Smith", "mobile": "0987654321" }
    ];

    for (const data of demoData) {
      const newEmployee = new Employee(data);
      await newEmployee.save();
    }

    res.status(201).send('Data added successfully');
  } catch (err) {
    console.error("Error occurred while adding data:", err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to Nodejs API Project');
});

app.get('/hello', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
