const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const passportconfig = require('./routes/passport')
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

const db = mongoose.connect("mongodb+srv://foreignadmits:foreignadmits123@cluster0-7k7mx.mongodb.net/foreignadmits")
  .then(() => {
    console.log("Connection to MongoDB is Successfull !");
  })
  .catch(() => {
    console.log("Connection to Database Failed !");
  });
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,Null"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS",
  );
  next();
});

app.get('/api', (req, res) => {
  res.json({
    "Message": "Connected To Foreign Admits Mentor Google Login Api"
  })
})

app.get('/api/mentor/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

app.get('/api/mentor/google/callback', passport.authenticate('google', { failureRedirect: '/auth/google/failure' }), (req, res) => {
  const token = jwt.sign({ email: req.user.email }, '@@@#%&$ve%*(tok???en//---==+++!!!log#%^%$in@@@@');
  console.log('mentor hit')
  const user_detail = JSON.stringify(req.user);
  res.redirect(`http://foreignadmits.com/mentor/google-login?token=${token}&user=${user_detail}`);
})

app.get('/api/auth/google/failure', (req, res) => {
  res.json({
    msg: 'Failed Google Login'
  })
})
module.exports = app;
