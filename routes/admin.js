const express = require('express')
const route = express.Router()
const AdminModel = require('../models/admin_models')
const Staff = require('../models/staff_model');
const Employee = require('../models/employee_model');
const StudentModel = require('../models/student_model');
const TeacherModel = require('../models/teacher_model');
const fs = require('fs')
const path = require('path');
const pdf = require('pdf-parse');
const say = require('say');
const filepath = path.join(__dirname, '../public/file/thought.pdf');

// Read the PDF file asynchronously
const dataBuffer = fs.readFileSync(filepath);

// Parse the PDF
pdf(dataBuffer).then(data => {
    // Extract text content from the PDF
    const text = data.text;

    // Split the text content into lines
    const lines = text.split('\n');

    // Function to log lines with a delay and speak them
    let index = 0;
    const logAndSpeakLine = () => {
        if (index < lines.length) {
            const line = lines[index].trim();  // Trim any extra spaces
            if (line) {
                console.log(line);  // Log the line
                say.speak(line);    // Speak the line using text-to-speech
            }
            index++;
            setTimeout(logAndSpeakLine, 6000); // Delay of 6 seconds between lines
        }
    };

    // Start logging and speaking lines
    logAndSpeakLine();
}).catch(err => {
    console.error('Error reading PDF:', err);
});


route.get("/getById/:id", async (req, resp) => {
    try {
        const { id } = req.params;
        const AllModels = [AdminModel, Staff, Employee, StudentModel, TeacherModel];
        let AllModelsData = null;
        
        for (const model of AllModels) {
            AllModelsData = await model.findById(id); 
            if (AllModelsData) {
                break; 
            }
        }
        
        if (AllModelsData) {
            resp.status(200).json({ success: true, data: AllModelsData, message: "User found successfully." });
        } else {
            resp.status(404).json({ success: false, message: "User not found." });
        }

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message });
    }
});

async function syncAdminsFromJson() {
    try {
        const filePath = path.join(__dirname, '../public/file/demo.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const admins = JSON.parse(jsonData);
        for (const admin of admins) {
            const existingAdmin = await AdminModel.findOne({ name: admin.name, country: admin.country, city: admin.city });
            // const newAdmin = await AdminModel.create(admin);
            if (!existingAdmin) {
                const newAdmin = await AdminModel.create(admin);
                console.log(newAdmin);

            } else {

            }
        }
        console.log("Admin sync completed.");
    } catch (error) {
        console.error("Error syncing admins from JSON:", error);
    }
}


syncAdminsFromJson();

route.post("/add", async (req, resp) => {
    console.log("Request received:", req.body);
    try {
        const { name, country, city } = req.body;
        const newAdmin = { name, country, city };
        const filePath = path.join(__dirname, '../public/file/demo.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const admins = JSON.parse(jsonData);
        admins.push(newAdmin);
        fs.writeFileSync(filePath, JSON.stringify(admins, null, 2));

        const createdAdmin = await AdminModel.create(newAdmin);

        resp.status(200).json({ success: true, data: createdAdmin, message: "Admin successfully created" });
    } catch (error) {
        // console.error("Error:", error);
        resp.status(500).json({ success: false, error: error.message });
    }
});

// const filePath = path.join(__dirname, '../public/file/demo.json');

// result = fs.readFileSync(filePath, 'utf-8')
// console.log(result);

// const dirPath = path.dirname(filePath);
// if (fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true }); 
// }

// fs.writeFileSync(filePath, "testing")

// route.post("/add", async (req, resp) => {
//     console.log("Request received:", req.body);
//     try {
//         const filePath = path.join(__dirname, '../public/file/demo.json');
//         const jsonData = fs.readFileSync(filePath);
//         const admins = JSON.parse(jsonData);
//         const { name, country, city } = req.body;
//         const newAdmin = { name, country, city };
//         console.log("New Admin:", newAdmin);
//         admins.push(newAdmin);
//         resp.status(200).json({ success: true, data: newAdmin, message: "Admin successfully created" });
//     } catch (error) {
//         console.error("Error:", error);
//         resp.status(500).json({ success: false, error: error.message });
//     }
// });



route.get("/getall", async (req, resp) => {

    try {
        const Admins = await AdminModel.find()
        resp.status(200).json({ success: true, data: Admins, message: "all admins retrieved successfully" })

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }
})




module.exports = route