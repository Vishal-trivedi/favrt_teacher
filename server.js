const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require("dotenv").config()


const errorHandler = require('./middleware/error')


const student = require("./routes/student")
const teacher = require("./routes/techer")

const app = express()


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("SUCCESSFULLY CONNECTED TO DB")
}).catch((err) => {
    console.log(err)
    console.log("ERROR CONNECTING TO DB")
})


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(errorHandler)

app.use("/api",student)
app.use("/api",teacher)



const PORT = process.env.PORT || 5000

app.listen(PORT,
    console.log(`Server started on port ${PORT}`))