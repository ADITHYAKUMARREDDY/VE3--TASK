const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', authMiddleware, taskController.getTasks);
router.get('/:id', authMiddleware, taskController.getTask);
router.post('/', authMiddleware, taskController.addTask);
router.put('/:id', authMiddleware, taskController.updateTask);
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
