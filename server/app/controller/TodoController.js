const TodoModel = require('../model/todo');


class TodoController {

    // Add Todo
    async addTodo(req, res) {
        try {
            const userId = req.user._id
            console.log("User id...", userId);
            const tododata = new TodoModel({ ...req.body, userId: userId });
            const data = await tododata.save();
            res.status(200).json({ succsss: true, message: "Todo added successfully", data });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "Error updating todo data" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // Show Todo
    async todoList(req, res) {
        try {
            const userId = req.user._id
            const todos = await TodoModel.find({ userId: userId });
            res.status(200).json({
                message: "Todo list fetched successfully",
                total: todos.length,
                todos
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Get Single 
    async singleTodo(req, res) {
        const id = req.params.id;
        try {
            const data = await TodoModel.findById(id);
            if (data) {
                res.status(200).json({ message: "Single todo fetched", data });
            } else {
                res.status(404).json({ message: "Todo not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error retrieving todo data" });
        }
    }

    // Update Data
    async editTodo(req, res) {
        const id = req.params.id;
        try {
            const updatedTodo = await TodoModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }
            );
            if (!updatedTodo) {
                return res.status(404).json({ message: "Todo not found" });
            }
            res.status(200).json({ message: "Todo updated successfully", data: updatedTodo });
        } catch (error) {
            const statusCode = error.name === 'ValidationError' ? 400 : 500;
            const message = error.name === 'ValidationError'
                ? { message: "Validation error", errors: Object.values(error.errors).map(err => err.message) }
                : { message: "Error updating todo data" };

            console.error(error);
            res.status(statusCode).json(message);
        }
    }

    // Delete todo
    async deleteTodo(req, res) {
        const id = req.params.id;
        try {
            const deleteTodo = await TodoModel.findByIdAndDelete(id);
            res.status(deleteTodo ? 200 : 404).json(
                deleteTodo ? { message: "Todo deleted successfully" } : { message: "Todo not found" }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting todo" });
        }
    }


}
module.exports = new TodoController()