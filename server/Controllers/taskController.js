const db = require("../Modules/dataBase.js");


const getTask = async (req, res) => {
   try {
    const get = await db.query("SELECT * FROM tasks WHERE user_task = $1", [req.cookies.username]);
    res.json({
        message:"Tasks fetched successfully",
        tasks: get.rows
    })
   } catch (error) {
    
   }
}

const addTask = async (req, res) => {
    try {
        const {task_title , task_description} = req.body;
        const username = req.cookies.username;
        const add = await db.query("INSERT INTO tasks (task_title, task_description, user_task) VALUES ($1, $2, $3) RETURNING *", [task_title, task_description, username]);
        res.json({
            message:"Task added successfully",
            task: add.rows[0]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"An error occurred"
        })
    }
}

const updateTasks = async (req, res) => {
    try {
        const {id} = req.params;
        const {task_title, task_description} = req.body;
        const update = await db.query("UPDATE tasks SET task_title = $1, task_description = $2 WHERE id = $3 AND user_task = $4 RETURNING *", [task_title, task_description, id, req.cookies.username]);
        res.json({
            message:"Task updated successfully",
            task: update.rows[0]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"An error occurred"
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTask = await db.query("DELETE FROM tasks WHERE id = $1 AND user_task = $2 RETURNING *", [id, req.cookies.username]);
        res.json({
            message:"Task deleted successfully",
            task: deleteTask.rows[0]
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:"An error occurred"
        })
    }
}


module.exports={
    getTask,
    addTask,
    updateTasks,
    deleteTask
}

