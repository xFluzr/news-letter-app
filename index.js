const bodyParser=require("body-parser");
const express= require("express");
const app=express();
const path=require('path');

app.use(express.static(__dirname + '/public'));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.use(express.static(path.join(__dirname, 'public')))
app.listen(3000,()=>{
    console.log("Server running on port 3000")
})