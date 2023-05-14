const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true 
    },
    description: {
        type: String,
        required: true 
    },
    dueDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model('Task', TaskSchema);