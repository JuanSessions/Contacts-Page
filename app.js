const express = require("express")
const app = express()
const createError = require("http-errors")
const mongoose = require("mongoose")
    //const logger = require("morgan")
const env = require("./config/config")
const CookieParser = require("cookie-parser")

const indexRoute = require("./routes/indexRoute")
const booksRoute = require("./routes/booksRoute")
const contactsRoute = require("./routes/contactsRoute")
const ordersRoute = require("./routes/ordersRoute")
const {
    log
} = require("./middleware/log")

const {
    setCors
} = require("./middleware/security")

const port = process.env.PORT || 3001;


mongoose.connect(env.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.connection.on("error", (err) => console.log(err))
mongoose.connection.on("open", () => console.log("database connected"))

app.use(CookieParser())
app.use(express.json())
    //this is the middleware, getting data from the controller

//app.use(logger("dev"))
app.use(setCors)

app.use("/", indexRoute)

app.use("/books", booksRoute)
app.use("/orders", ordersRoute)
app.use("/contacts", contactsRoute)



//errors handler
app.use((req, res, next) => {
    next(createError(404))
})

//error catcher
app.use((err, req, res, next) => {
    res.json({
        status: err.status,
        err: err.message
    })
})





app.listen(port, () => console.log("server is running"))