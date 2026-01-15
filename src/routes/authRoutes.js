import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../utils/db.js'
const router = express.Router()

router.post('/register', async (req,res) => {
    const {email,password} = req.body
    try{

        if(!email || !password){
           return res.status(401).json({
                status: "registration failed",
                message: "username or password needed"
            })
        }
        
        
            const hashedPassword = bcrypt.hashSync(password, 8)
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
               
        })
              res.status(201).json({
                status: "success",
                message:"account created successfully",
                email

         
        })
    
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "server error"
        })
    }
})

router.post('/login', async (req,res) => {
    const {email, password} = req.body
try{
    
    if(!email || !password){
           return res.status(401).json({
                status: "failed",
                message: "username or password needed"
            })

        }
        

       const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
    
     if(!bcrypt.compareSync(password, user.password) || !user ){
        return res.status(401).json({
            status: "failed",
            message: "incorrent credentials"
        })
     }
     const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        )
     res.status(201).json({
        status: "success",
        message: "log in successful",
        token
     })
    
        
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "error from the server"
        })
    }
    
})

export default router