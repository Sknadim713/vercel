const mongoose =require('mongoose')

const TeacherSchema =mongoose.Schema({
name:{
    type:String,
    required:true
},
role:{
    type:String,
    required:true
},
department:{
    type:String,
    required:true
}
},{timestamps:true});
const Teacher = mongoose.model('Teacher' ,TeacherSchema)

module.exports = Teacher;
