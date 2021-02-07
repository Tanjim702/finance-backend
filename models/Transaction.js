const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount:{
        type:Number,
        required:true,
    },
    incomeType:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    month:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})

const Transaction = mongoose.model('TransactionTransactions',transactionSchema)
module.exports = Transaction