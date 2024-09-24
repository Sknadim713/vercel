const mongoose = require('mongoose');



const AdminSchema  =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
},{timestamps:true})

const Admin = mongoose.model('Admin' ,AdminSchema)

module.exports = Admin;