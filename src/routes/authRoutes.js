import express from 'express'
import bcrypt from 'bcryprt'
import jwt from 'jsonwebtoken'
import prisma from '../utils/db.js'
const router = express()

router.post('/register', async (req,res) => {
    const {email,password} = req.body
    try{

        if(!email || !password){
           return res.status(401).json({
                status: "registration failed",
                message: "username or password needed"
            })
        }
        const checkEmail = await prisma.user.findUnique({
            where: {
                email
            }
            })
          
        
              if(checkEmail){
                return res.send("email exists, use another email")
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
                message:"account created successfully"

         
        })
    
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "server error"
        })
    }
})

router.post('/login', (req,res) => {
    const {email, password} = req.body
try{
    
    if(!email || !password){
           return res.status(401).json({
                status: "failed",
                message: "username or password needed"
            })

        }

       const user = prisma.findUnique({
            where: {
                email
            }
        })
    
     if(!bcrypt.compareSync(password, user.Password) || !user ){
        return res.status(401).json({
            status: "failed",
            message: "incorrent credentials"
        })
     }
     res.status(201).json({
        status: "success",
        message: "log in successful"
     })
    
        
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: "error from the server"
        })
    }
    
})

