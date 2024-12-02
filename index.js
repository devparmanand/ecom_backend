const express = require("express")
const dotenv = require("dotenv").config()
const Router = require("./routes/MainRoutes")

const app =  express()

require("./db_connect")

app.use(express.json())
app.use("/api",Router)
app.use(express.static("./public"))
app.use("/public",express.static("./public"))


app.listen(8000,console.log("Server is Running at http://localhost:8000"))
