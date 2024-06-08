const express = require("express")
const router = express.Router()
const taskController = require("../Controllers/taskController.js")


router.get("/task/get", taskController.getTask);
router.post("/task/add", taskController.addTask);
router.put("/task/update/:id", taskController.updateTasks);
router.delete("/task/delete/:id", taskController.deleteTask);


module.exports = router;

