const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ohmmz47.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productCollection = client.db("emaJohn").collection("product");
    app.get("/product", async (req, res) => {
      const query = {};
      const cursor = productCollection.find();
      const products = await cursor.toArray();
      res.send(products);

      app.get("/productCount", async (req, res) => {
        const query = {};
        const cursor = productCollection.find(query);
        const count = await cursor.count();
        res.send({ count });
      });
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("John is running and waiting for ema");
});

app.listen(port, () => {
  console.log("John is running on port", port);
});
