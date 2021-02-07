const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')


//See all users
router.get("/users",async (req,res)=>{
    try {
        const users = await User.find()
        if(users){
            res.status(200).json({
                success:true,
                error:false,
                data:users
            })
        }else{
            res.status(204).json({
                success:false,
                error:false,
                data:'No users registered currently'
            })
        }
    } catch (error) {
        res.status(500).json({
            success:false,
            error:true,
            data:error
        })
    }
})
router.post("/signup",async (req, res) => {
    const {name,email,password} = req.body
    if(!name || !email || !password){
        return res.status(404).json({
            success:false,
            error:false,
            data:'Please enter the credentials correctly'
        })
    }

    try {
        const createdUser =await User.create({name,email,password})
        res.status(201).json({
            success:true,
            error:false,
            data:createdUser
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:true,
            data:error
        })
    }
})


// router.get('/api/post', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'SECRET_KEY', (err, data) => {
//         console.log(data)
//         res.json({data})
        
//     })

// })


router.post("/login", async (req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(204).json({
            success:false,
            error:false,
            data:'Please enter the credentials correctly'
        })
    }
    try {
        const user = await User.findOne({email})
        if(!user){
            res.status(404).json({
                success:false,
                error:false,
                data:`No user found by email ${email}`
            })
        }
        jwt.sign({user},"SECRET_KEY",(err,token)=>{
            if(err){
                res.status(500).json({
                    success:false,
                    error:true,
                    data:error
                })
            }else{
                res.status(200).json({
                    success:true,
                    error:false,
                    token:`Bearer ${token}`,
                })
            }

        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:true,
            data:error
        })
    }

})
module.exports = router