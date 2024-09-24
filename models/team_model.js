const mongoose =require('mongoose');



const TeamSchema =mongoose.Schema({
    country: {
        type: String,
        required: [true ,"country required"]
    },
    sport: {
        type: String,
        required: [true ,"sport is required"]
    },

} ,{timestamps:true})

module.exports = mongoose.model('Team', TeamSchema);