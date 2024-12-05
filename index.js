const express = require("express")
const dotenv = require("dotenv").config()
const Router = require("./routes/MainRoutes")
const path = require("path")


const app =  express()

require("./db_connect")

app.use(express.json())
app.use("/api",Router)
app.use(express.static("./public"))
app.use("/public",express.static("./public"))

let PORT = process.env.PORT || 5000


app.listen(PORT,console.log(`Server is Running at port ${PORT}`))
