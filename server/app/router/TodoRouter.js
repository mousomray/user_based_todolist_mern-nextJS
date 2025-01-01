const express = require('express')
const TodoController = require('../controller/TodoController')
const { Auth } = require('../middleware/auth')
const router = express.Router()

router.post('/addtodo', Auth, TodoController.addTodo)
router.get('/todolist', Auth, TodoController.todoList)
router.get('/todolist/:id', Auth, TodoController.singleTodo)
router.get('/edittodo/:id', Auth, TodoController.editTodo)
router.delete('/deletetodo/:id', Auth, TodoController.deleteTodo)

module.exports = router 