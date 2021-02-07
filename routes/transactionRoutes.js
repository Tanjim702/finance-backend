const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Transaction = require('../models/Transaction')
const User = require('../models/User')
function verifyToken(req, res, next) {
    //Get auth header
    const token = req.headers['authorization'].split(' ')[1].slice(0, -1)
    //Check

    if (typeof token !== 'undefined') {
        jwt.verify(token, "SECRET_KEY", (err, data) => {
            // if(err){
            //     console.log(err)
            //     next(err)
            // }
            // console.log(data)
            req.user = data.user._id
            next()
        })

    } else {
        res.sendStatus(403)
    }
}
router.post('/createTransaction', verifyToken, async (req, res) => {

    const { source, amount, description, month, incomeType, date } = req.body
    const transaction = {
        source,
        incomeType,
        amount,
        description,
        date,
        month,
        user: req.user
    }
    console.log(transaction)
    try {
        const newTransaction = await Transaction.create(transaction)
        res.json({
            success: true,
            error: false,
            data: newTransaction
        })
    } catch (error) {
        res.json(error)
    }
})
router.get('/allTransactions', verifyToken, async (req, res) => {
    // console.log(req.user)
    // res.end()
    const Atransactions = { income: [], expense: [], asset: [], liability: [] }
    try {
        const transactions = await Transaction.find({ user: req.user })
        transactions.forEach(transaction => {
            if (transaction.incomeType === 'income') {
                Atransactions.income.push(transaction)
                
            }
            if (transaction.incomeType === 'expense') {
                Atransactions.expense.push(transaction)
                
            }
            if(transaction.incomeType === 'asset'){
                Atransactions.asset.push(transaction)
               
            }
            if(transaction.incomeType === 'liability'){
                Atransactions.liability.push(transaction)
                
            }
        })
        res.json({
            success: true,
            error: false,
            data: Atransactions,
            
        })
    } catch (error) {
        res.json(error)
    }
})

router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    try {
        await Transaction.findByIdAndDelete(id)
        res.json({
            success: true,
            error: false,
            data: 'Deleted successfully'
        })
    } catch (error) {
        res.json(error)
    }
})
module.exports = router