const mongoose = require('mongoose')

const Ticket = mongoose.model('Ticket',{
    description: {
        type: String,
        trim: true,
        required: true
    },
    resolved: {
        type: Boolean,
        default: false
    }
})

module.exports = Ticket