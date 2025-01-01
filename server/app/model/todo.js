const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: "User Id is Required"
    },
}, { timestamps: true });

const TodoModel = mongoose.model('todo', TodoSchema);

module.exports = TodoModel;