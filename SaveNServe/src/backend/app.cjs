const express = require("express");
const app = express();
const mongoose =require("mongoose");


app.get("/surplus",(req,res)=>{
    res.send("Hello");
})
app.listen(8080, ()=>{
    console.log("Server is listening on port 8080");
})