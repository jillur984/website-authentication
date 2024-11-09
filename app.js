require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const dbURL= process.env.MONGO_URL
const User=require('./models/user.model')

  mongoose.connect(dbURL)
  .then(()=>{
    console.log("Mongo Atlas is connected")
  })
  .catch((error)=>{
    console.log("Nor Connected",error)
    process.exit(1)
  })
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


app.post("/register",async(req,res)=>{

  try {
    const newUser=new User(req.body)
   await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json(error.message)
  }
  
})
app.post("/login",async(req,res)=>{
  try {
    const {email,password}=req.body
    const user=await User.findOne({email:email})
  if(user && user.password==password){
    res.status(200).json({
      status:"valid User"
    })
  }
  else{
    res.status(404).json({
      status:"not Valid User"
    })
  }
  } catch (error) {
    res.status(404).json({
      status:"Invalid User"
    })
  }
})



// route error handle
app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});
// handle server error
app.use((err, req, res, next) => {

  res.status(500).json({
    message: "Something is Broken",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
