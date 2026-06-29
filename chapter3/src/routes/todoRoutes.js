import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
    const todos = getTodos.all(req.userId);
    res.json(todos);
});

router.post('/', (req, res) => {
    const {task} = req.body
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES(?,?)`)
    const result = insertTodo.run(req.userId,task)

    res.json({ id: result.lastInsertRowid, task, completed: 0 })

});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;

    try {
        const updateTodo = db.prepare(`
            UPDATE todos
            SET task = ?, completed = ?
            WHERE id = ? AND user_id = ?
        `);

        updateTodo.run(task, completed, id, req.userId);

        res.status(200).json({
            message: "Todo updated successfully"
        });

    } catch (err) {
        console.log(err.message);
        res.sendStatus(500);
    }
});
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    try {
        const deleteTodo = db.prepare(`
            DELETE FROM todos
            WHERE id = ? AND user_id = ?
        `);

        deleteTodo.run(id, req.userId);

        res.status(200).json({
            message: "Todo deleted successfully"
        });

    } catch (err) {
        console.log(err.message);
        res.sendStatus(500);
    }
});

export default router;