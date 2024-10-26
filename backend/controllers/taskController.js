const db = require('../config/db');
exports.getTasks = (req, res) => {
  db.query('SELECT * FROM tasks WHERE user_id = ?', [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error fetching tasks' });
    res.json(results);
  });
};
exports.addTask = (req, res) => {
    const task = { ...req.body, user_id: req.userId };
    console.log("User ID:", req.userId); 
    db.query('INSERT INTO tasks SET ?', task, (err) => {
      if (err) {
        console.error("Error inserting task:", err); 
        return res.status(500).json({ error: 'Error adding task' });
      }
      res.json({ message: 'Task added' });
    });
  };

exports.getTask = (req, res) => {
  const taskId = req.params.id;
  db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, req.userId], (err, results) => {
    if (err || !results.length) return res.status(404).json({ error: 'Task not found' });
    res.json(results[0]);
  });
};

exports.updateTask = (req, res) => {
  const taskId = req.params.id;
  db.query('UPDATE tasks SET ? WHERE id = ? AND user_id = ?', [req.body, taskId, req.userId], (err) => {
    if (err) return res.status(500).json({ error: 'Error updating task' });
    res.json({ message: 'Task updated' });
  });
};

exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, req.userId], (err) => {
    if (err) return res.status(500).json({ error: 'Error deleting task' });
    res.json({ message: 'Task deleted' });
  });
};
