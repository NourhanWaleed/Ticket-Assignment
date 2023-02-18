const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.get('/users', auth,  async (req, res) =>{
    await User.find({}).then((users) =>{
        res.send(users)
    }).catch((e) =>{
        console.log(e)
    })
})
router.delete('/users/:id', async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
            if(!user){
                return res.status(404).send()
            }
            res.send(user)
    } catch (e) {
res.status(500).send
    }})
/*router.post('/vendors/login', async(req: any, res: any) =>{
    try{
        const vendor = await Vendor.findByCredentials(req.body.email, req.body.password)
        const token = await vendor.generateAuthToken()
        res.send({vendor, token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/vendors/logout', auth, async (req: any, res: any) => {
    try {
        req.vendor.tokens = req.vendor.tokens.filter((token: any) => {
            return token.token !== req.token
        })
        await req.vendor.save()

        res.send()
    } catch (e) {
        res.status(500).send()
        console.log(e)
    }
})

router.post('/vendors/logoutAll', auth, async (req: any, res: any) => {
    try {
        req.vendor.tokens = []
        await req.vendor.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



router.get('/vendors/me', auth, async (req: any, res: any) =>{
   res.send(req.vendor)
})

router.get('/vendors/:id', async (req: any, res: any) => {
    const _id = req.params.id
    await Vendor.findById(_id).then((vendor: any) =>{
        if(!vendor){
            return res.status(404).send()
        }
        res.send(vendor)
    }).catch((e: any) =>{
        res.status(500).send()
    })
})

router.patch('/vendors/me', auth, async (req: any, res: any) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
        //not working
    try {
        updates.forEach((update) => req.vendor[update] = req.body[update])
        await req.vendor.save()
        res.send(req.vendor)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
        
    }
})

router.patch('/vendors/:id', async(req: any,res:any) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
       const vendor = await Vendor.findById(req.params.id)
       updates.forEach((update) => vendor[update] = req.body[update])
       await vendor.save()
       if(!vendor){
            return res.status(400).send()
        }
        res.send(vendor)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/vendors/me', auth, async (req: any, res: any) => {
    try {
        await req.vendor.remove()
        res.send(req.vendor)
    } catch (e) {
        res.status(500).send()
    }
})


router.delete('/vendors/:id', async(req: any, res: any) => {
    try{
        const vendor = await Vendor.findByIdAndDelete(req.params.id)
            if(!vendor){
                return res.status(404).send()
            }
            res.send(vendor)
    } catch (e) {
res.status(500).send
    }
})*/ 
module.exports = router