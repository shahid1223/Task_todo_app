// const fs = require('fs');
const Todo = require('../models/TodoModel');
const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');

exports.getAllTodos = catchAsync(async (req, res, next) => {
    const allTodoes = await Todo.find();
    res.status(200).json({ status: 'success', data: allTodoes, code: 200 });
});

exports.createTodo = catchAsync(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const newTodo = await Todo.create(req.body);
    res.status(201).json({ message: "Success", newTodo, code: 201 })
});

exports.getTodoById = catchAsync(async (req, res, next) => {
    const findTodoById = await Todo.findById(req.params.id);
    console.log("hello", req.params.id)
    // return;
    if (!findTodoById) {
        return res.status(404).json({ err: "Todo not found", code: 404 });
    };
    res.status(200).json({ status: "Success", data: { findTodoById }, code: 200 })
});

exports.updateTodoById = catchAsync(async (req, res, next) => {
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updateTodo) {
        return res.status(404).json({ err: "Todo not found", code: 404 });
    };
    res.status(200).json({ status: "Success", updateTodo, code: 200 })
});

exports.updateTodoStatusById = catchAsync(async (req, res, next) => {
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updateTodo) {
        return res.status(404).json({ err: "Todo not found", code: 404 });
    };
    res.status(200).json({ status: "Success", updateTodo, code: 200 })
});

exports.deleteTodoById = async (req, res, next) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
        return res.status(404).json({ err: "Todo not found", code: 404 });
    };

    res.status(200).json({
        message: "success",
        code: 200,
        data: {
            Todo: "<deleted Todo here>"
        }
    });
};