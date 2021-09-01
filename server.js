const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose')
require('./passport');

const app = express();
const PORT = 3000;

app.use(passport.initialize());
app.use(express.json());

app.get('/login', passport.authenticate('facebook' , { scope : ['email'] } ) );

app.get("/login/callback",passport.authenticate("facebook", {
    successRedirect: "/home",
    failureRedirect: "/error",
    session : false 
    })
);

app.get('/home', (req,res) => {
    res.send("Welcome user. This is Home page");
});

app.get('/error', (req,res) => {
    res.send("Error");
});

    
app.listen(PORT,async () => {
    console.log("Server established at PORT : "+PORT);
    await mongoose.connect('mongodb://localhost:27017/passport_demo' ,{useNewUrlParser:true,useFindAndModify:false, useCreateIndex:true, useUnifiedTopology:true}).then((resolved)=>{
        console.log("Database Connected");
    }).catch((rejected)=>{
        console.log("Database connection unsuccessful");
    });
});



