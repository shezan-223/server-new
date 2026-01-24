require('dotenv').config();
const express =require("express")
const cors =require("cors")

const app =express()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
  res.send("Server is running");
});
// ok
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongopractice.2tbsahv.mongodb.net/?appName=MongoPractice`;


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

// get Property
app.get ("/api/properties/latest",async(req,res)=>{

const result =await realstatecollection.find().sort({_id:1}) .limit(6).toArray()
res.send(result)

})
//  get property details
app.get("/property/:id",async(req,res)=>{
  const id =req.params.id;
  const result = await realstatecollection.findOne({
    _id:new ObjectId(id)
  })
  res.send(result)
})


// my property
app.get("/my-properties",async(req,res)=>{
  const email =req.query.email

  if(!email){
    return res.status(400).send({message:"Email is required"})
  }
   
  const result = await realstatecollection.find({email}).toArray()
  res.send(result)
if(error){
  console.error()
  res.status(401).send({message :"Server Error"})
  
}
} 


)

// all property start
app.get("/api/allProperty",async(req,res)=>{
 try{

   const result =await realstatecollection.find().toArray()
   return res.send(result)
 }
 catch(error){
  res.status(500).send({message : "Error fetching properties "})

 }
})
// all property end

// rating start
// আপনার ইমেইল অনুযায়ী রিভিউগুলো পাওয়ার রাউট
app.get("/api/my-reviews/:email", async (req, res) => {
    const email = req.params.email;
    const query = { reviewerEmail: email };
    const result = await reviewCollection.find(query).toArray();
    res.send(result);
});



// property delete start
app.delete("/api/properties/:id",async(req,res)=>{
 try{
   const id =req.params.id
  const query ={_id :new ObjectId(id)}
  const result =await realstatecollection.deleteOne(query)

  if(result.deletedCount === 1){
    res.send(result)
  }
  else{
    res.status(404).send({message :"No property found"})
  }
 }
   catch(error){
    res.status(500).send({message : "invalid Id formate or server error"})
   }
})
// property delete end

// Update property 
app.patch("/api/properties/:id",async(req,res) =>{
  const id =req.params.id;
  const filter ={_id : new ObjectId(id) }
  const updatedDoc ={
    $set :{
    propertyName:req.body.propertyName,
    price:req.body.price,
    description:req.body.description,
    category:req.body.category,
    location:req.body.location,
    yourname:req.body.yourname
  }
  }
  
  const result =await realstatecollection.updateOne(filter,updatedDoc)
  res.send(result);
} 

)




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);