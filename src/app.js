const express = require('express')
const userRouter = require('./routers/user')
const ticketRouter = require('./routers/ticket')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(ticketRouter)
module.exports = app