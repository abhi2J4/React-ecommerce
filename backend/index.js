const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Middleware setup
app.use(express.json()); // Body parser middleware
app.use(cors()); // CORS middleware

// Database connection
mongoose.connect("mongodb+srv://yadavabhisek748862:n4qwZDanw47yNDg2@cluster0.ffc8yal.mongodb.net/ee commerce");

// API endpoints
app.get("/", (req, res) => {
  res.send("Express App is running");
});

// Image storage engine
const storage = multer.diskStorage({
  destination: './upload/image',
  filename: (req, file, cd) => {
    return cd(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage: storage });

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});

// Schema for creating products
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: String,
    required: true,
  },
  old_price: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post('/addproduct', async (req, res) => {
  const product = new Product({
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});







// const port = 4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require ("path");
// const cors = require ("cors");
// const { type } = require("os");




// // data base connected with mongodb
// mongoose.connect("mongodb+srv://yadavabhisek748862:n4qwZDanw47yNDg2@cluster0.ffc8yal.mongodb.net/ee commerce")


// // Api creation


// app.get("/",(req,res)=>{
//   res.send("Express App is running")
// })

// // image storage engine

// const storage = multer.diskStorage({
//   destination: './upload/image',
//   filename:(req,file,cd)=>{
//     return cd(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })
// const upload = multer ({storage:storage})

// // creating upload endpoint for images


// app.use('/images',express.static('upload/images'))

// app.post("/upload",upload.single('product'),(req,res)=>{
//   res.json({
//     success:1,
//     image_url:`http://localhost:${port}/images/${req.file.filename}`
//   })
// })


// // schema for crating for products

// const Product = mongoose.model("Product",{
// id:{
//      type:Number,
//      require:true,
// },
//  name:{
//   type:String,
//   require:true,
//  },
//  image:{
//   type:String,
//   require:true,
//  },
//  category:{
//   type:String,
//   require:true,
//  },
//  new_price:{
//   type:String,
//   require:true,
//  },
//  old_price:{
//   type:String,
//   require:true,
//  },
//  date:{
//     type:Date,
//     default:Date.now,
//  },
//  avilable:{
//   type:Boolean,
//   default:true,
//  },
// })

// app.post('/addproduct',async(req,res)=>{
//    const product = new Product({
//     id:req.body.id,
//     name:req.body.name,
//     image:req.body.image,
//     category:req.body.category,
//     new_price:req.body.new_price,
//     old_price:req.body.old_price,

//    });
//    console.log(product);
//    await product.save();
//    console.log("saved");
//    res.json({
//     success:true,
//     name:req.body.name,
//    })
// })


// app.listen(port,(error)=>{
// if (!error) {
//     console.log("server Running on  port" + port)
// }
// else
// {
//     console.log("Error :"+ error);
// }
// });
// app.use(express.json());
// app.use(cors());