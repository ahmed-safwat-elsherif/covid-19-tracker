const mongoose = require('mongoose')
const Schema = mongoose.Schema

const countrySchema = Schema({
    country: {
        type: String
    },
    country_iso2: {
        type: String
    },
    population: {
        type: Number
    },
    deaths: {
        type: Number
    },
    recovered: {
        type: Number
    },
    confirmed_daily: {
        type: Number
    }
})

const Country = mongoose.model('Country', countrySchema)

module.exports = Country