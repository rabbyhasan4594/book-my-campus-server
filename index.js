const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());

//mongoDb


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2yyawyx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    client.connect();
        const collegesCollection = client.db('bookMyCampus').collection('colleges');
        const admissionCollection = client.db('bookMyCampus').collection('admission');



        app.get('/colleges', async (req, res) => {
            const result = await collegesCollection.find({}).toArray();
            res.send(result);
        })
 app.get('/collegesSection', async (req, res) => {
            const result = await collegesCollection.find({}).limit(3).toArray();
            res.send(result);
        })


        app.get('/college/:id',async (req, res) => {
            const result = await collegesCollection.findOne({
                _id: new ObjectId(req.params.id),
              });
              res.send(result);
            
        });
        app.post("/admission", async (req, res) => {
            const body = req.body;
            const result = await admissionCollection.insertOne(body);
            res.send(result)
        })
        app.get('/details/:id',async (req, res) => {
            const result = await collegesCollection.findOne({
                _id: new ObjectId(req.params.id),
              });
              res.send(result);
            
        });

        app.get("/myCollege/:email", async (req, res) => {
            const result = await admissionCollection
                .find({
                    email: req.params.email,
                })
                .toArray();
            res.send(result);
        })
       





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Booking start')
})
app.listen(port, () => {
    console.log(`Booking going on ${port}`)
})