const express = require("express")
const hbs = require("express-handlebars")
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || "8000"


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
  saveUninitialized: false
}))  

//initialize passport
app.use(passport.initialize())
//set session with passport
app.use(passport.session())


// conncet to local MongoDB
const url = 'mongodb://127.0.0.1:27017/authentication'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// log error or success message
mongoose.connection.once("open", () => {
  console.log('connected to database',url)
})
mongoose.connection.on("error", err => console.log("connection", err))


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

// mongoose passport plugin to salt,hash and store the user into MongoDB
UserSchema.plugin(passportLocalMongoose)

// create mongoose model
const User = mongoose.model('User',UserSchema)

// stores user data into session
passport.serializeUser(User.serializeUser())
// retrieve user data stored in session
passport.deserializeUser(User.deserializeUser())



// setup Routes
app.get("/",(req,res) => {
  res.render("index", {title:"Home"})
})

app.get("/login", (req,res) =>{
  res.render("login", {title: "Login"})
})
app.get("/index", (req,res) =>{
  res.render("index", {title: "Index"})
})

app.get("/register", (req,res) =>{
  res.render("register", {title: "Register"})
})

// register user
app.post("/register", (req,res) =>{

})

// login a user
app.post("/login", (req,res) =>{

})


app.listen(PORT, () => {
  console.log(`server is up and running on PORT: ${PORT}`)
})