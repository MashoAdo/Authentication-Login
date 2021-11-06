const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || "8000"


// conncet to cloud mongo db
mongoose.connect(`mongodb+srv://masho:${process.env.MONGODB_PASS}@xtechguy.jstjm.mongodb.net/Authentication?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once("open", () => {
  console.log('connected to database')
})


app.listen(PORT, () => {
  console.log(`server is up and running on PORT: ${PORT}`)
})