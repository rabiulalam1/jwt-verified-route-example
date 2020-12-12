const router = require('express').Router()
const User = require('../models/User')
const {validation } = require('../validation')

//Validation with JOI


router.post('/register',(req, res) => {
    const { error, value } = validation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const user = new User(value)
    try {
        user.save()
        res.send({message:"User Created"})
    }
    catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;
