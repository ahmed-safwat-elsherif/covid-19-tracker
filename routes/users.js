const express = require('express')
const router = express.Router()
const Country = require('../models/countryModel')
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const { authenticate } = require('../auth/user');
const { validate, userValidate } = require('../validations/userValidate')

const jwt = require('jsonwebtoken');

router.post('/register', async (req, res, next) => {
    try {
        const { username="", password="", fullName="" } = req.body;
        console.log(req.body)
        if(password.length < 6) throw new Error({error:'password accepts only minimum 6 characters'})
        const hash = await bcrypt.hash(password, 7);
        const user = await User.create({ username, password: hash, fullName })
        res.statusCode = 201;
        res.send({ user, message: { success: true } })
    } catch (error) {
        console.log(error)
        if (error.keyPattern.username){
            res.status(409).send({error});
            return;
        } 
        res.status(422).send({ error });
    }
})

router.post('/login', validate, async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username }).exec();
        if (!user) throw new Error("wrong username or password");
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) throw new Error("wrong username or password");
        const token = jwt.sign({ _id: user._id }, 'the-attack-titan');
        res.statusCode = 200;
        res.send({ message: "logged in successfully", username: user.username,fullName:user.fullName, token })
    } catch (error) {
        res.statusCode = 401;
        res.send({ error: "Invalid credentials" })
    }
})

router.get('/profile', authenticate, async (req, res) => {
    try {
        const { _id } = req.signData;
        const { username, fullName, favoriteCountries } = await User.findOne({ _id }).populate('favoriteCountries');
        res.status(201).send({ username, fullName, favoriteCountries })
    } catch (error) {
        res.status(401).send({ error, message: 'user not found' })
    }
})

router.route('/favorites')
.post(authenticate, async (req, res) => {
    try {
        const { _id } = req.signData;
        const countryid = req.body._id
        let country = await Country.findOne({_id:countryid}).exec()
        if(!country) throw new Error('Unable to find the country')
        let favoriteCountries = await User.findOneAndUpdate({ _id }, { $addToSet: { favoriteCountries: [countryid] } }, {
            new: true
        });
        if(!favoriteCountries) throw new Error('Unable to add country to favorites')
        res.status(200).send({favoriteCountries})
    } catch (error) {
        res.status(404).send({error})
    }
})
.delete(authenticate, async(req,res)=>{
    try {
        const { _id } = req.signData;
        const countryid = req.body._id
        let country = await Country.findOne({_id:countryid}).exec()
        if(!country) throw new Error('Unable to find the country')
        let favoriteCountries = await User.findOneAndUpdate({ _id }, { $pullAll: { favoriteCountries: [countryid] } }, {
            new: true
        });
        if(!favoriteCountries) throw new Error('Unable to add country to favorites')
        res.status(200).send({favoriteCountries:favoriteCountries.favoriteCountries})
    } catch (error) {
        res.status(404).send({error})
    }
})

router.route('/')
    .delete(authenticate, (req, res) => {
        const { _id } = req.signData;
        User.deleteOne({ _id }, (error) => {
            if (error) {
                res.status(401)
                res.send({ error })
                return;
            }
            res.status(200);
            res.send({ message: "user was deleted successfully", _id });
        })
    })
    .patch(authenticate, userValidate, async (req, res) => {
        try {
            console.log()
            const { _id } = req.signData;
            console.log(_id)
            let newUpdate = req.body;
            console.log(newUpdate)
            // if (!newUpdate.password) throw new Error({error: "password should be passed to the body of the request"})
            let updates = {
                username:newUpdate.username,
                fullName:newUpdate.fullName
            }
            if (newUpdate.newPassword) {
                updates.password = await bcrypt.hash(newUpdate.newPassword, 7);
            }
            const user = await User.findOneAndUpdate({ _id }, updates, {
                new: true
            }).exec();
            console.log(user)
            if(!user) throw new Error({error:"Error in updating user info"})
            res.status(201).send({ message: "user was edited successfully", user,valid:true })
        } catch (error) {
            res.status(401).send(error); 
        }
    })

module.exports = router