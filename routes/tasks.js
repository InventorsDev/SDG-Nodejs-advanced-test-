const express = require('express');
const router = express.Router();
const Task = require('../models/task'); 

//retrieve all tasks
router.get('/', (req, res) => {
    
});

//create task
router.post('/', (req, res) => {
    
});

//get task
router.get('/:id', (req, res) => {
    
});

//update task
router.patch('/:id', (req, res) => {
    
});

//delete task
router.delete('/:id', (req, res) => {
    
});

// Mark task as aompleted
router.patch('/:id/completed', (req, res) => {
    
});

module.exports = router;