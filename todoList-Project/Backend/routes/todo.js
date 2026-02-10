const express = require("express")
const Todo = require('../models/todo.js')
const router = express.Router()

//Get all Todos
router.get('/',async (req,res)=>{
    try{
        const todo = await Todo.find()
        res.status(201).json(todo)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Add a new Todo
router.post('/',async (req,res) => {
        const todo = new Todo({
            text: req.body.text
        })
    try{
        const newTodo = await todo.save()
        res.status(201).json(newTodo)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Update a Todo
router.patch('/:id', async (req,res) => {
    try{
         const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: "Todo not found" });

        if (req.body.text !== undefined) {
        todo.text = req.body.text;
        }
        if (req.body.completed !== undefined) {
        todo.completed = req.body.completed;
        }

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete a Todo
router.delete('/:id', async (req,res) => {
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.status(201).json({message: "Todo deleted successfully"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router