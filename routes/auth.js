const router = require('express').Router()
const User = require('../models/User')
const { validation } = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


router.post('/register', async(req, res) => {
    const { error, value } = validation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const emailExists = await User.findOne({ email: req.body.email })
    
    if (emailExists) {
        return res.status(400).send({message: "User already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        email: value.email,
        password: hashPassword
    })
    try {
        user.save()
        res.status(200).send({user: user._id, message:"User Created"})
    }
    catch (err) {
        res.status(400).send(err)
    }
})

router.post('/login', async (req, res) => {
    const { error, value } = validation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = await User.findOne({ email: req.body.email })
    
    if (!user) {
        return res.status(400).send({message: "Invalid Username or Password"})
    }

    const validPass = await bcrypt.compare(req.body.password, user.password)

    if (!validPass) {
        return res.status(400).send({message: "Invalid Username or Password"})
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN)
    
    res.header('auth-token', token).send("Success")
})

module.exports = router;
