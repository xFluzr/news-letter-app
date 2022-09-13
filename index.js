const bodyParser=require("body-parser");
const express= require("express");
const https=require("https");

const app=express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});
app.post("/",(req,res)=>{
    const fName=req.body.fname;
    const lName=req.body.lname;
    const email=req.body.mail;
    const data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName,
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    console.log(jsonData);
    const url="https://us12.api.mailchimp.com/3.0/lists/79acf115e8";
    const options={
        method:"POST",
        auth:"kuba2:7f017c38845f297e2fc6f1fe427e21a0-us12"
    }

    const request=https.request(url,options,(response)=>{
        if(response.statusCode===200){
            res.send("Succesfully subscribed")
        }
        else{
            res.send("Ups something went wrong")
        }
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData)
    request.end();
});

app.listen(3000,()=>{
    console.log("Server running on port 3000")
})

//API Key
//7f017c38845f297e2fc6f1fe427e21a0-us12

//List id
//79acf115e8