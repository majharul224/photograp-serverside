const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
// const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());




// mongocunected

const uri = `mongodb+srv://
${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.esgnv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {

  try {
    const imageCollection = client.db("photoCollection").collection("services");
    const reviews = client.db("photoCollection").collection("reviews");
    //service 
    app.get('/services', async (req, res) => {
      const quary = {}
      const cursor = imageCollection.find(quary)
      const allServices = await cursor.limit(3).toArray()
      res.send(allServices)
    })

// allservices
    app.get('/items', async (req, res) => {
      const quary = {}
      const cursor = imageCollection.find(quary)
      const allServices = await cursor.toArray()
      res.send(allServices)
    })

    // reviewlode
    app.post("/review", async (req, res) => {
      const query = req.body;
      query.date = new Date();
      const result = await reviews.insertOne(query);
      res.send(result);
    });

    // Review Name
    app.get("/reviews/:name", async (req, res) => {
      const name = req.params.name;
      // console.log(name);
      const query = { name };
      const result = await reviews.find(query).sort({ date: -1 }).toArray();
      res.send(result);
    });

// review email
    app.get("/myreviews/:userEmail", async (req, res) => {
      const email = req.params.userEmail;
      // console.log(email);
      const query = { email };
      const result = await reviews.find(query).sort({ date: -1 }).toArray();
      res.send(result);
    });



    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const quary = { _id: ObjectId(id) }
      const service = await imageCollection.findOne(quary)
      res.send(service)
    })


  }
  finally {

  }
}
run().catch(error => console.error(error))












app.get('/', (req, res) => {
  res.send("hello world")
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
