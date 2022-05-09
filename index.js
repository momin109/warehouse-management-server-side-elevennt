const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.evvgj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        client.connect();
        const serviceCollection = client.db('warehouse').collection('service');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const service = await cursor.toArray();
            res.send(service);
        });

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await itemCollection.findOne(query);
            res.send(service);
        });
        PUT
        app.put('/service/:id', async (req, res) => {
            const id = req.params.id;
            const deliveredQuantity = req.body;
            console.log(deliveredQuantity);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: deliveredQuantity.newQuantity
                }
            };
            const result = await itemCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        app.put('/service/:id', async (req, res) => {
            const id = req.params.id;
            const setQuantity = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: setQuantity.newQuantity
                }
            };
            const result = await itemCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        POST
        app.post('/service', async (req, res) => {
            const newItem = req.body;
            const result = await itemCollection.insertOne(newItem);
            res.send(result);
        });
        DELETE
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await itemCollection.deleteOne(query);
            res.send(result);
        });
    }
    finally {

    }
}

run().catch(console.dir)


