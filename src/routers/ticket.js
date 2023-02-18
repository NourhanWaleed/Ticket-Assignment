const express = require('express')
const Ticket = require('../models/ticket')
const auth = require('../middleware/auth')
const router = new express.Router()




//read tickets as user
router.get('/tickets',auth,async (req, res) =>{
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.resolved = req.query.resolved === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1: 1
    }
    try {
        await req.user.populate({
            path: 'tickets',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tickets)
    } catch (e) {
        res.status(500).send()
    }
})


//read one ticket as user
router.get('/tickets/:id',auth, async (req, res) => {
    const _id = req.params.id
    try{
    const ticket = await Ticket.findOne({_id, owner:req.user._id})
        if(!ticket){
            return res.status(404).send()
        }
        res.send(ticket)
    } catch(e) {
        res.status(500).send()
    }
})


//edit ticket(accept, resolve)
router.patch('/tickets/:id', async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['resolved','accepted']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const ticket = await Ticket.findById(req.params.id)
        updates.forEach((update) => ticket[update] = req.body[update])
        await ticket.save()
        if(!ticket){
            return res.status(400).send()
        }

    
        return res.send(ticket)

    }catch(e){
        res.status(400).send(e)
        
    }
})


//delete ticket when done
router.delete('/tickets/:id', async(req, res) => {
    try{
        const ticket = await Ticket.findByIdAndDelete(req.params.id)
            if(!ticket){
                return res.status(404).send()
            }
            res.send(ticket)
    } catch (e) {
res.status(500).send()
    }
})

module.exports = router