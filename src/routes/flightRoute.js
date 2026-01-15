import express from 'express'
import prisma from '../utils/db.js'

const router = express.Router()

// get all flights
router.get('/', async (req,res)=> {
    try{
    const userId = req.userId
    const allFlight =  await prisma.flight.findMany({
    where: {
        userId: userId
    }
    })
    if (!allFlight){
        return res.send("No flight available")
    }
    res.status(201).json({
        status: "success",
        allFlight
    })
   
} catch(err){
    res.send(err)
}
})

router.get('/:id', (req,res) => {
    try{
    const ID = req.params * 1
    

    const oneFlight = prisma.flight.findUnique({
        where: {
            id: ID,
            userId:  req.userId * 1
        }
    })
} catch(err){
    req.send(err)
}
})

export default router