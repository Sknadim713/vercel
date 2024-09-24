const mongoose =require('mongoose');


const PlayerSchema =mongoose.Schema({
    name: {
        type: String,
        required: [true , "name is required"]
    },
    age: {
        type: Number,
        required: true
    },

    country: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
 
},{timestamps :true });

module.exports = mongoose.model('Player', PlayerSchema);
