const express = require('express')
const Ticket = require('../models/ticket')
const User = require('../models/user')
const router = new express.Router()




//create ticket and assign it to user
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


//read all tickets
router.get('/admintickets',async (req, res) =>{
    await Ticket.find({}).then((tickets) =>{
        res.send(tickets)
    }).catch((e) =>{
        console.log(e)
    })
})

module.exports = router