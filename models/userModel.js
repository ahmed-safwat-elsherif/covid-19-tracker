const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength:5
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        minlength: 3,
        maxlength: 50
    },
    favoriteCountries:[{type: Schema.Types.ObjectId, ref:'Country'}]
})

const User = mongoose.model('User', userSchema);

module.exports = User