const express = require('express');
const router = express.Router();
const {
    createTask,
    getTask,
    getOneTask,
    updateTask,
    deleteTask,
    markTaskAsCompleted
} = require("../controllers/taskController");


//retrieve all tasks
router.get('/', getTask);

//create task
router.post('/', createTask);

//get task
router.get('/:id', getOneTask);

//update task
router.patch('/:id', updateTask);

//delete task
router.delete('/:id', deleteTask);

// Mark task as aompleted
router.patch('/:id/completed', markTaskAsCompleted);

module.exports = router;