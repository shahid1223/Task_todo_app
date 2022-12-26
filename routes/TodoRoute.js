const express = require('express');
const TodoRouter = express.Router();
const { getAllTodos, createTodo, getTodoById, updateTodoById, deleteTodoById, updateTodoStatusById } = require('../controller/todoController');
const { body } = require('express-validator');

TodoRouter.route('/').get(getAllTodos).post(
    body('task', 'task is required').not().isEmpty()
    , createTodo);
TodoRouter.route('/:id').get(getTodoById).patch(updateTodoById).delete(deleteTodoById);
TodoRouter.route('/updatestatus/:id').patch(updateTodoStatusById);

module.exports = TodoRouter;