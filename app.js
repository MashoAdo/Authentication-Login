const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const { MongoClient } = require('mongodb')
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || "8000"
// conncet to cloud mongo db
const uri = `mongodb+srv://masho:<${process.env.MONGODB_pass}>@xtechguy.jstjm.mongodb.net/AuthenticationApp?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.listen(PORT, () => {
    console.log(`server is up and running on PORT: ${PORT}`)
})