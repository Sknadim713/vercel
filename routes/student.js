const express = require('express');
const router =express.Router();
const StudentModel = require('../models/student_model');
const TeacherModel = require('../models/teacher_model');


router.post("/add",async(req ,resp)=>{
try{
const {studentname,studentsurname ,role ,teacherId}=req.body
const teachers = await TeacherModel.findById(teacherId);
if (!teachers) {
  return resp.status(404).json({ error: 'teacherId not found' });
}
const student = await StudentModel.create({studentname,studentsurname ,role ,teacher:teacherId})
resp.status(200).json({success:true , data:student ,message:"student created successfully"})
}catch(error){
resp.status(404).json({success:false , error:error.message})
}
})


// router.get("/get",async(req ,resp)=>{
// try{
//     const students = await StudentModel.find().populate('teacher')
//     resp.status(200).json({success:true , data:students ,message:"students retrieved successfully"})

// }catch(error){
// resp.status(404).json({success:false , error:error.message})
// }
// })
router.get("/get", async (req, resp) => {
    try {
        const students = await StudentModel.find().populate('teacher');

        // Transforming the response to include teacher details directly
        const result = students.map(student => ({
            _id: student._id,
            studentname: student.studentname,
            studentsurname: student.studentsurname,
            role: student.role,
            // teacherId: student.teacher._id,
            teacherName: student.teacher.name,
            teacherRole: student.teacher.role,
            teacherDepartment: student.teacher.department,
            // teacherCreatedAt: student.teacher.createdAt,
            // teacherUpdatedAt: student.teacher.updatedAt,
        }));

        resp.status(200).json({success: true,data: result,message: "Students retrieved successfully"});
    } catch (error) {resp.status(404).json({success: false,error: error.message});
    }
});






module.exports =router;