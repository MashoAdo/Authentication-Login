const express = require("express")
const session = require("express-session")
const exphbs = require("express-handlebars")
const mongoose = require("mongoose")
const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

const app = express()


const PORT = process.env.PORT || "8000"

app.listen(PORT, () => {
    console.log("server is running on"{ PORT })
})