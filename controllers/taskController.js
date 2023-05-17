const { query } = require('express');
const Task = require('../models/task'); 


const createTask = async (req, res) => {
    const {title, description, dueDate, status} = req.body;
    
    const create = await Task.create({
        title,
        description
    })

    return res.status(201).json(create)

}

const getTask = async (req, res) => {
    const query = req.query;        
    const data = await Task.find();

   if(Object.keys(query).length < 1){
        return res.status(200).json(data)
   }
   
   console(Object.keys(query).length)
   

}

const getOneTask = async (req, res) => {
    try {
        const _id = req.params.id
        const data = await Task.findOne({_id});
        
        let result = {};

        if(data !== null){
            result = data
        }     
    
        return res.status(200).json(result)

    } catch (error) {
        console.error(error)
    }

}

const updateTask = async (req, res) => {
    const {title, description} = req.body;
    const _id = req.params.id

    const  task = await Task.findOne({_id });

    if(task == null){
        return res.status(404).json({
            status: "failed",
            message: "Task not found"
        });
    }

    task.title = title;
    task.description = description;

    const save = task.save()

    return res.status(200).json(req.body)
}

const deleteTask  = async (req, res) => {

    const _id = req.params.id
    const task = await Task.findOneAndDelete({_id});

    return res.status(204).json({
        status: "successful",
        message: 'Task deleted successfully.'
    })


} 

const markTaskAsCompleted = async (req, res) => {
    const _id = req.params.id;
    const data = await Task.findOne({_id});

    if(data == null){
        return res.status(404).json({
            status: "failed",
            message: 'Task not found.'
        })
    }

    data.status = "completed";
    data.save();

    return res.status(200).json({ status: "successful", message: 'Task updated successfully.' });


}



module.exports = {
    createTask,
    getTask,
    getOneTask,
    updateTask,
    deleteTask,
    markTaskAsCompleted
}