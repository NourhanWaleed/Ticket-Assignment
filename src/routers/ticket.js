const express = require('express')
const Ticket = require('../models/ticket')
const router = new express.Router()

router.post('/tickets', async (req,res) =>{
    const ticket = new Ticket(req.body)
    try {
        await ticket.save()
    
        res.status(201).send({ ticket})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})
router.get('/tickets',async (req, res) =>{
    await Ticket.find({}).then((tickets) =>{
        res.send(tickets)
    }).catch((e) =>{
        console.log(e)
    })
})

router.get('/tickets/:id', async (req, res) => {
    const _id = req.params.id
    await Ticket.findById(_id).then((ticket) =>{
        if(!ticket){
            return res.status(404).send()
        }
        res.send(ticket)
    }).catch((e) =>{
        res.status(500).send()
    })
})
router.patch('/tickets/:id', async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['resolved']
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

       
       /* if(ticket[update] === true){
            console.log("here")
            res.send(ticket)
            ticket = await Ticket.findByIdAndDelete(req.params.id)
            
        }*/
        return res.send(ticket)

    }catch(e){
        res.status(400).send(e)
        
    }
})
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
/*


router.delete('/items/:id', async(req: any, res: any) => {
    try{
        const item = await Item.findByIdAndDelete(req.params.id)
            if(!item){
                return res.status(404).send()
            }
            res.send(item)
    } catch (e) {
res.status(500).send()
    }
})
*/
module.exports = router