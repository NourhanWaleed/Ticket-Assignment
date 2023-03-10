const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

//Create user
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

//login user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

//logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
        console.log(e)
    }
})

//read users
router.get('/users', auth,  async (req, res) =>{
    await User.find({}).then((users) =>{
        res.send(users)
    }).catch((e) =>{
        console.log(e)
    })
})


//delete self
router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

//delete a certain user
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

    //logout all
router.post('/users/logoutAll', auth, async (req, res) => {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    })
    

 //read profile   
router.get('/users/me', auth, async (req, res) =>{
    res.send(req.user)
 })


 //read a certain profile
 router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    await User.findById(_id).then((user) =>{
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) =>{
        res.status(500).send()
    })
})


/*



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




})*/ 
module.exports = router