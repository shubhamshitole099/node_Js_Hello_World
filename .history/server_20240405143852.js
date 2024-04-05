const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json(), cors());


const uri = "mongodb://127.0.0.1:27017/employee";
app.get('/', (req, res) => {
  res.send('Welcome to Nodejs API Project');
});

app.get('/hello', (req, res) => {
  res.send('Hello World!!');
});


app.post('/add', (req, res) => {

  const demoData = [
    { "name": "John Doe", "mobile": "1234567890" },
    { name: 'Jane Smith', mobile: '0987654321' }

  ];


  MongoClient.connect(uri, function (err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB:", err);
      res.status(500).send('Internal Server Error');
      return;
    }
    console.log("Connected successfully to MongoDB");

    const db = client.db(dbName);

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
