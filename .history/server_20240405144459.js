const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

// MongoDB connection URI
const uri = "mongodb://127.0.0.1:27017"; // Assuming MongoDB is running locally
const dbName = 'employee';

// Connect to MongoDB using Mongoose
mongoose.connect(`${uri}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for your data model
const employeeSchema = new mongoose.Schema({
  name: String,
  mobile: String
});

// Create a Mongoose model based on the schema
const Employee = mongoose.model('Employee', employeeSchema);

// Middleware setup
app.use(bodyParser.json());

// Route to add data to the database (using POST method)
app.post('/add', async (req, res) => {
  try {
    const demoData = [
      { "name": "John Doe", "mobile": "1234567890" },
      { "name": "Jane Smith", "mobile": "0987654321" }
    ];

    // Iterate over each object in demoData array
    for (const data of demoData) {
      // Create a new document using the Employee model
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
