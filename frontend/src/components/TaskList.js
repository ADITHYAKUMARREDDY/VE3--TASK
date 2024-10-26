import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import config from './Config';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await axios.get(`${config.backendEndpoint}/tasks`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTasks(response.data);
      } catch {
        setMessage('Error loading tasks');
      }
    };
    loadTasks();
  }, []);

  const updateTask = async (id, completed) => {
    try {
      await axios.put(`${config.backendEndpoint}/tasks/${id}`, { completed }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(tasks.map((task) => (task.id === id ? { ...task, completed } : task)));
    } catch {
      setMessage('Error updating task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${config.backendEndpoint}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch {
      setMessage('Error deleting task');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-4">Task List</h2>
      {tasks.length ? (
        tasks.map((task) => (
          <div key={task.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary">{task.title}</h5>
              <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'} text-white`}>
                {task.completed ? 'Completed' : 'Pending'}
              </span>
              <p className="card-text">{task.description}</p>
              <div>
                <Link to={`/task/${task.id}`} className="btn btn-outline-primary btn-sm me-2">View</Link>
                <Link to={`/edit-task/${task.id}`} className="btn btn-outline-secondary btn-sm me-2">Edit</Link>
                {!task.completed && (
                  <button onClick={() => updateTask(task.id, true)} className="btn btn-success btn-sm me-2">
                    Mark as Done
                  </button>
                )}
                <button onClick={() => deleteTask(task.id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-muted">{message || 'No tasks found'}</p>
      )}
    </div>
  );
};

export default TaskList;



