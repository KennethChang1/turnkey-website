// import express
//import 
const express = require("express");
var cors = require('cors');
const bodyParser =  require("body-parser");
const path = require('path')
const nodemailer = require('nodemailer');
const conf = require('./const.js') // configuration
//const mongoose = require('mongoose')

var fs = require('fs');
var http = require('http');

//import schema
const DateReserved = require('./date_reserved');

const app = express(); // Initialize app
app.use(cors()) // disabled cors
app.use(bodyParser.json()); // set routes public

//redirect
if(conf.redirect)
{
  app.use(function(req, res,next) {
      if (req.protocol != 'https')
      {
          // the statement for performing our redirection
          // return res.json({'url':req.url}) 
          return res.redirect('https://'+conf.domain+ req.url);
        }else{
          next();
        }
      });
}

// set api route
app.use('/api/send-email',function(req,res){
    // validation
    var data = {
        "full_name" : req.body.full_name,
        "institution" : req.body.institution,
        "product_of_interest" : req.body.product_of_interest,
        "country" : req.body.country,
        "email" : req.body.email,
        "phone" : req.body.phone,
        "message" : req.body.message,
        "reach_me_through" : req.body.reach_me_through,
        "meeting_schedule" : req.body.meeting_schedule
    };

    // send email
    let judul = "Incoiming contact message!";
    let body = "New message \n" 
    +  "name: " + req.body.full_name + "\n" 
    +  "institution: " + req.body.institution + "\n" 
    +  "product_of_interest: " + req.body.product_of_interest + "\n" 
    +  "country: " + req.body.country + "\n" 
    +  "email: " + req.body.email + "\n" 
    +  "phone: " + req.body.phone + "\n" 
    +  "message: " + req.body.message + "\n" 
    +  "reach_me_through: " + req.body.reach_me_through + "\n" 
    +  "meeting_schedule: " + req.body.meeting_schedule + "\n \n"  
    +  "Send from: " + "Contact form website" 

    // create email structure
    var mailOptions = {
        from: conf.smtp_email,
        to: conf.email_tujuan,
        subject: judul,
        text: body
    };
    
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        return res.json({"status":"failed","data":data,"error":error});
    } else {
        return res.json({"status":"success","data":data});
    }
    });
});
app.use('/api/insert-meet-schedule',function(req,res){
  var dr = new DateReserved();
  dr.date = req.body.date;

  dr.save((err)=>{
    if(err)
    {
        res.json({status:"error",message:err,data:dr});
    }else{
        res.json({
            message : "success",
            status : 200,
            data:dr,
        })
    }
  })
});
app.use('/api/check-meet-schedule',function(req,res){
  DateReserved.findOne({date:req.body.date},(err,data)=>{
    if(err)
    {
      res.json({status:"error",message:err})
    }else{
      res.json({
        status:"success",
        data:data
      });
    }
  })
})
app.use('/', express.static(path.join(__dirname, 'public'))) // set static directory

// create email transport
const transporter = nodemailer.createTransport({
    host: conf.smtp_server,
    port: 465,
    auth: {
        user: conf.smtp_email,
        pass: conf.smtp_password
    },
});

/* mail check */
function mail_check(req,res){
    // check if email connected successfully
    // verify connection configuration
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
      res.json({status:"Server is not ready to take our messages"});
    } else {
      console.log("Server is ready to take our messages");
      res.json({status:"Server is ready to take our messages"});
    }
  }); 
}


// mongoose
// connect to mongoose set connection variable/
// mongoose.connect('mongodb://localhost/turnkey',{useNewUrlParser:true});
// const db = mongoose.connection;
//added check for db connection
// if(!db)
// {
//    console.log("error connecting to");
//}
// else
//{
//    console.log("Db connected successfully");
//}


// your express configuration here
var httpServer = http.createServer(app);


// launch app to specified port
// app.listen(conf.port,function(){
//     console.log("Running app on port "+conf.port);
// })
httpServer.listen(conf.port);