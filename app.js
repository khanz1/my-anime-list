const express = require("express");
const app = express();
const PORT = process.env.PORT || 4004;
const router = require("./routes");
const session = require('express-session')

app.set("trust proxy", 1)
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))
app.use("/", router)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))