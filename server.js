
// import express from "express";
// import cors from 'cors';
// import 'dotenv/config';
// import mysql from 'mysql';
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

const express = require('express');
const bodyParser= require('body-parser');
const server = express();
const cors = require('cors');
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.json());
require('dotenv').config();
let PORT = 3000;



const MongoClient = require('mongodb').MongoClient;
const connectionString = process.env.DB_STRING;





server.use(cors());

server.use(express.json());

MongoClient.connect(connectionString, {useUnifiedTopology:true})
  .then(client => {

    console.log('Connected to Database')
    const db = client.db('contact')
    // const task = db.collection('task')
    const contact = db.collection('contacts')


    server.post('/post', (req,res)=>{


    //     let name = req.body.name;
    // let email = req.body.email;
    // let message = req.body.message;
    
    contact.insertOne({name:req.body.name, email:req.body.email, message:req.body.message})
      
    .then(result=>{
      res.json(result);
      console.log(result);
      
    })
    .catch(error=>console.error(error));
    })

  })


  server.listen(process.env.PORT || PORT,()=>{
    console.log(`Server running on port ${PORT}`)
  })

// const db = mysql.createConnection({
//   host:'localhost',
//   port:8889,
//   user:'root',
//   password:'root',
//   database:'sachigot_contactForm'
// })




// const db = mysql.createConnection({
//   host: process.env.DBHOST,
//   port: process.env.DBPORT,
//   user: process.env.DBUSER,
//   password: process.env.DBPASSWORD,
//   database: process.env.DBDATABASE,
// })

// db.connect(error=>{
//     if(error) console.log('Sorry cannot connect to db: ' , error);
//     else console.log('Connected to mysql db');
//   })

// SET @p0='hi'; SET @p1='gotosachiii@gmail.com'; SET @p2='hi'; CALL `contacts`(@p0, @p1, @p2);
// server.post('/post',(req, res)=>{
//     let name = req.body.name;
//     let email = req.body.email;
//     let message = req.body.message;
    


//     let deliverMessage = 'CALL `contacts`(?, ?, ?);'
   
//     db.query(deliverMessage, [name,email ,message], (error, data, fields)=>{
//      if(error){
//        res.json({ErrorMessage:error});
//      }else{
//        res.json({
//          message:"successful!",
//         //  addNewProducts:true,
         
//        })
//      }
//    })
//     })



// server.listen(3306, function(){
//     console.log("Node Express server is now running on port 3306");
//  })
