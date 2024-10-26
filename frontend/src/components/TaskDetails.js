import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import config from './Config';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${config.backendEndpoint}/tasks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setTask(response.data);
      } catch {
        setMessage('Error loading task');
      }
    };
    fetchTask();
  }, [id]);

  return (
    <div className="container mt-4">
      {task ? (
        <div className="card shadow-sm p-4">
          <h2 className="text-primary">Task Details</h2>
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p>
            <strong>Status:</strong> 
            <span className={`badge ${task.completed ? 'bg-success' : 'bg-warning'} ms-2`}>
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </p>
          <Link to="/" className="btn btn-primary mt-3">Back to Task List</Link>
        </div>
      ) : (
        <p className="text-muted">{message}</p>
      )}
    </div>
  );
};

export default TaskDetails;
