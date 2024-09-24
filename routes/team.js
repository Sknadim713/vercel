const express = require('express');
const router = express.Router();
const TeamModel = require('../models/team_model')



router.post("/add", async (req, resp) => {
    try {
        const { country, sport } = req.body
        const newTeam = await TeamModel.create({ country, sport })
        resp.status(200).json({ success: true, data: newTeam, message: "Team created successfully" })

    } catch (error) {
        resp.status(500).json({ success: false, error: error.message })
    }

})



module.exports = router
