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
    app.get('/services', async (req, res) => {
      const quary = {}
      const cursor = imageCollection.find(quary)
      const allServices = await cursor.toArray()
      // console.log(allServices)
      res.send(allServices)
    })


    app.get('/threeServices', async (req, res) => {
      const quary = {}
      // const cursor = imageCollection.find(quary).limit(3)
      const services = await cursor.toArray()
      // console.log(services)
      res.send(services)
    })
  
    app.get('/services/:id', async (req, res) => {
      const id= req.params.id;
      const quary ={_id: ObjectId(id)}
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
