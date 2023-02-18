const express = require('express')
const Ticket = require('../models/ticket')
const User = require('../models/user')
const router = new express.Router()

//TODO: ASSIGN TICKET (add to post)

router.post('/admintickets', async (req,res) =>{
    const ticket = new Ticket(req.body)
    try {
        await ticket.save()
    
        res.status(201).send({ ticket})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


//this works
router.get('/admintickets',async (req, res) =>{
    await Ticket.find({}).then((tickets) =>{
        res.send(tickets)
    }).catch((e) =>{
        console.log(e)
    })
})

module.exports = router