const express =require("express")
const cors =require("cors")

const app =express()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// sourav
// Rddi0hToDvrpCcQ4
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sourav:Rddi0hToDvrpCcQ4@mongopractice.2tbsahv.mongodb.net/?appName=MongoPractice";


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
    await client.connect();

const db =client.db("realstate")
const realstatecollection =db.collection("realstatecollection")


app.get ("/",(req,res)=>{

res.send("Real state server is running ")
})


// Add properties
app.post ("/properties",async(req,res)=>{
  const property =req.body
  const result =await realstatecollection.insertOne(property)
  res.send (result)
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