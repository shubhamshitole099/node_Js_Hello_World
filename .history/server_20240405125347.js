const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const MongoClient = require('mongodb').MongoClient; // Add MongoDB client
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json(), cors());

// MongoDB connection URI
const uri = "mongodb://localhost:27017"; // Assuming MongoDB is running on the same instance

// Database Name
const dbName = 'employee';

app.get('/', (req, res) => {
  res.send('Welcome to Nodejs API Project');
});

app.get('/hello', (req, res) => {
  res.send('Hello World!!');
});

// Route to add demo data
app.post('/add-demo-data', (req, res) => {
  // Demo data (replace with your desired data)
  const demoData = [
    { name: 'John Doe', mobile: '1234567890' },
    { name: 'Jane Smith', mobile: '0987654321' }
    // Add more demo data as needed
  ];

  // Connect to MongoDB
  MongoClient.connect(uri, function (err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB:", err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);

    // Insert demo data into MongoDB
    const collection = db.collection('employees');
    collection.insertMany(demoData, function (err, result) {
      if (err) {
        console.log("Error occurred while inserting demo data into MongoDB:", err);
        res.status(500).send('Internal Server Error');
        return;
      }
      console.log("Demo data inserted successfully:", result.ops);
      client.close();
      res.status(201).send('Demo data inserted successfully');
    });
  });
});

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
