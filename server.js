const express = require('express')
const db = require('./models/db')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use("/user",require('./routes/userRoutes'))
app.use("/transactions",require('./routes/transactionRoutes'))


app.listen(3030,()=>{
    console.log("App is running on port 3030")
    db()
})