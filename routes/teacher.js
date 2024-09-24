const express = require('express');
const router = express.Router();
const TeacherModel = require('../models/teacher_model')


router.post("/create", async (req, resp) => {
    try {
        const { name, department, role } = req.body
        const teacher = await TeacherModel.create({ name, department, role })
        resp.status(200).json({ success: true, data: teacher, message: 'teacher created successfully' })
    } catch (error) {
        resp.status(404).json({ success: false, error: error.message })
    }
})

router.post("/add", async (req, resp) => {
    try {
        const { name, department, role } = req.body
        const newTeachers = new TeacherModel({ name, department, role })
        const save = await newTeachers.save();
        resp.status(200).json({ success: true, data: save, message: 'teacher saved successfully' })
    } catch (error) {
        resp.status(404).json({ success: false, error: error.message })
    }

})


router.put("/update", async (req, resp) => {
    try {
        const { id } = req.query;
        const { name, department, role } = req.body;
        if (!id) {
            return resp.status(404).json({ success: false, message: "id is required" });
        }
        const updatedTeacher = await TeacherModel.findByIdAndUpdate(id, { name, department, role }, { new: true });
        if (!updatedTeacher) {
            return resp.status(404).json({ success: false, message: "teacher not found" });
        }
        resp.status(200).json({ success: true, data: updatedTeacher, message: "teacher updated successfully" });

    } catch (error) {
        resp.status(404).json({ success: false, message: error.message });
    }

})

router.put("/updatebyid/:id", async (req, resp) => {
    try {
        const { id } = req.params
        const { name, department, role } = req.body;
        if (!id) {
            return resp.status(404).json({ success: false, message: "id is required" });
        }
        const updateData = await TeacherModel.findByIdAndUpdate(id, { name, department, role }, { new: true })
        resp.status(200).json({ success: true, data: updateData, message: "update successfully" })
    } catch (error) {
        resp.status(404).json({ success: false, message: error.message });
    }
})




router.get("/getall", async (req, resp) => {
    try {
        const { name } = req.query;
        let filter = {};
        if (name) {
            filter.name = new RegExp(name, 'i');
        }
        const teachers = await TeacherModel.find(filter);
        resp.status(200).json({ success: true, data: teachers });
    } catch (error) {
        // Handle any errors
        resp.status(404).json({ success: false, error: error.message });
    }
});


router.get("/getbyid", async (req, resp) => {
    try {
        const { id } = req.query;
        const teacher = await TeacherModel.findById(id)
        if (!id) {
            resp.status(404).json({ success: false, message: "id is required" })
        }
        resp.status(200).json({ success: true, data: teacher, message: "teacher founded" });

    } catch (error) {
        resp.status(404).json({ success: false, message: error.message })
    }
})


router.get("/byid/:id", async (req, resp) => {
    try {

        const { id } = req.params
        const teacher = await TeacherModel.findById(id)
        resp.status(200).json({ success: true, data: teacher, message: "teacher found" });

    } catch (error) {
        resp.status(404).json({ success: false, message: error.message })
    }
})


router.delete("/delete/:id", async (req, resp) => {
    try {
        const { id } = req.params;

        if (!id) {
            resp.status(200).json({ success: false, message: "id is required" })
        }
        const deleteTeacher = await TeacherModel.findByIdAndDelete(id)
        resp.status(200).json({ success: true, data: deleteTeacher, message: "teacher deleted successfully" });
    } catch (error) {
resp.status(404).json({ success: false, message: error.message})
    }
})






module.exports = router