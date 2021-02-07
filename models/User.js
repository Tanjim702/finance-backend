const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    transactions:{
        type:Schema.Types.ObjectId,
        ref:'TransactionTransactions'
    }
})

const User = mongoose.model('TransactionUsers',userSchema)
module.exports = User