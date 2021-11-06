const express = require("express")
const session = require("express-session")
const hbs = require("express-handlebars")
const mongoose = require("mongoose")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || "8000"


// conncet to cloud mongo db
mongoose.connect(`mongodb+srv://masho:${process.env.MONGODB_PASS}@xtechguy.jstjm.mongodb.net/xtechguy?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.once("open", () => {
  console.log('connected to database')
})

// schema and model
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User',UserSchema)

// middleware
app.engine("hbs", hbs({extname: '.hbs'}))
app.set("view engine", 'hbs')
app.use(express.static(__dirname + "/public"))
// for parsing
app.use(express.urlencoded({extended: false}))
// for testing
app.use(express.json())



// creates a session
app.use(session({
  secret: "verysolidsecret",
  resave: false,
  saveUninitialized: true

}))


//====== passport.js==========
app.use(passport.initialize())
// to keep the session running
app.use(passport.session())

// store user data in session
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
   User.findById(id, function (err, user) {
     done (err, user)
   })
})

// set strategy and authenticate users using username and password
passport.use(new localStrategy(function (username, password, done) {
  User.findOne({username: username}, function (err, user) {
    if (err) return done(err)
    if (!user) return done(null, false, {message: "Incorrect username."})

    bcrypt.compare(password, user.password, function(err ,res) {
      if (err) return done(err)
      if (res === false) return done(null, false, {message:'incorrect password.'})

      return done(null, user)
    })
  })
}))





app.listen(PORT, () => {
  console.log(`server is up and running on PORT: ${PORT}`)
})