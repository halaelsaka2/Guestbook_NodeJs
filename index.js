const express = require('express');
const userRoute = require("./routs/user");
const guestbookRoute = require("./routs/guestbook");
const messageRoute = require("./routs/message")
require('express-async-errors');
require('dotenv').config();
require("./db");
const cors = require ("cors")
const app =express();
const port=process.env.PORT||3000;

app.use(cors())

app.use(express.json());
app.use(express.urlencoded());

app.use("/user",userRoute);
app.use("/guestbook",guestbookRoute);
app.use("/message",messageRoute);



app.use((req,res,next)=>{
    res.json({
        "request url":req.url,
        method: req.method,
        "current time":Date.now()
    })
})

app.use((err,req,res,next) => {
    console.log(err)
    const statusCode= err.statusCode || 500;

    // if(err.statusCode >=500){
    //     return res.status(statusCode).json({
    //         meesage:'Something wrong',
    //         type:'INTERNAL_SERVER_ERORR',
    //         details:[]
    //     })
    // }
    res.status(statusCode).json({
        // statusCode:err.statusCode,
        meesage:err.message,
        type:err.type,
        details:err.details
    })
})

app.listen(port, () => console.log(`running at port ${port}`));