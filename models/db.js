const mongoose = require('mongoose')

async function db(){
    const connect =await mongoose.connect('mongodb+srv://tanjim:tanjim@cluster0.i5mdg.mongodb.net/tanjim?retryWrites=true&w=majority',{ useNewUrlParser: true,useUnifiedTopology: true })
    console.log(`Connected to database!`)
}
module.exports = db
