const express = require('express')
const userRouter = require('./routers/user')
const ticketRouter = require('./routers/ticket')
const adminRouter = require('./routers/admin')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(ticketRouter)
app.use(adminRouter)
module.exports = app