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
    const data = await Task.find().select({"description":1, "dueDate":1, "status": 1, "title": 1, "_id": 0});
    const b_data = JSON.parse(JSON.stringify(data));
    let converted = []

    b_data.forEach((newItem) => {
        if (newItem.dueDate) {
            const date = new Date(newItem.dueDate)
            const ndate = date.toISOString().substring(0, 10);           
            newItem.dueDate = ndate
        }
        converted.push(newItem);
      });


   if(Object.keys(query).length < 1){
        return res.status(200).json(converted)
   }
   
   const filterBy = Object.keys(query)[0];
   let filteredTasks = converted;

   switch (filterBy) {
    case "dueDate":

        filteredTasks = filteredTasks.filter(task => task.dueDate === query[filterBy]);

        break;
    
    case "status":

        filteredTasks = filteredTasks.filter(task => task.status === query[filterBy]);

        break;

    case "title":
        filteredTasks = filteredTasks.filter(task => task.title.includes(query[filterBy]));
        break;
   
    default:

        break;
   }

   return res.status(200).json(filteredTasks)

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
  
    const data = await Task.findOneAndUpdate(
      { _id },
      { $set: { status: "completed" } },
      { new: true }
    );
  
    await data.save();
  
    return res
      .status(200)
      .json(data);
};
  



module.exports = {
    createTask,
    getTask,
    getOneTask,
    updateTask,
    deleteTask,
    markTaskAsCompleted
}