const express = require("express")
const router = express.Router()
const userSettings = require("../Controllers/settings.js")

router.get("/user/get/settings", userSettings.getDefaultSettings)
router.post("/user/post/add", userSettings.InsertSettings)
router.put("/user/update/:id", userSettings.updateSettings)
router.delete("/user/delete/setting/:id", userSettings.deleteSetting)


module.exports = router