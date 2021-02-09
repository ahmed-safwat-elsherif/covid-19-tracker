const express = require('express')
const { authenticate } = require('../auth/user')
const router = express.Router()
const Country = require('../models/countryModel')
const User = require('../models/userModel')

router.get('/noOfRecords', async (req,res)=>{
    console.log("ASDF")
    try {
        let numOfCountries =  await Country.countDocuments().exec();
        if(!numOfCountries) throw new Error(`Unabled to find any country to count`)
        res.status(200).send({ numOfCountries })
    } catch (error) {
        res.status(401).send(error)
    }
})
router.get('/favorites',authenticate, async (req,res)=>{
    try {
        let _id = req.signData
        let { limit = 32, skip = 0 } = req.query;
        if (Number(limit) > 32) {
            limit = 32;
        }
        const { favoriteCountries } = await User.findOne({ _id }).populate('favoriteCountries');
        console.log({here:true})
        let idArray = favoriteCountries.map(fav => fav._id)
        console.log(idArray)
        
        let countries =  await Country.find({
            _id:{$in:idArray}
        }).skip(Number(skip)).limit(Number(limit)).exec();
        if(!countries) throw new Error(`Unabled to find any country to display`)
        res.status(200).send({ length: countries.length, countries })
    } catch (error) {
        res.status(401).send(error)
    }
})
router.get('/',async (req,res)=>{
    try {
        let { limit = 32, skip = 0 } = req.query;
        if (Number(limit) > 32) {
            limit = 32;
        }
        let countries =  await Country.find().skip(Number(skip)).limit(Number(limit)).exec();
        if(!countries) throw new Error(`Unabled to find any country to display`)
        res.status(200).send({ length: countries.length, countries })
    } catch (error) {
        res.status(401).send(error)
    }
})

router.get('/:_id', async (req,res)=>{
    try {
        const {_id} = req.params
        let country = await Country.findOne({_id}).exec()
        if(!country) throw new Error('Unable to find the country')
        res.status(200).send({country})
    } catch (error) {
        res.status(404).send({error})
    }
})


module.exports = router