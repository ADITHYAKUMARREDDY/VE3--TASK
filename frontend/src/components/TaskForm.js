import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import config from './Config';

const TaskForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', description: '', completed: false });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      axios
        .get(`${config.backendEndpoint}/tasks/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then((response) => setFormData(response.data))
        .catch(() => setMessage('Error fetching task'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = id ? `${config.backendEndpoint}/tasks/${id}` : `${config.backendEndpoint}/tasks`;
      const method = id ? 'put' : 'post';
      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/');
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error saving task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>{id ? 'Edit Task' : 'Add Task'}</h2>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="form-control mb-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="form-control mb-2"
      />
      <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Add'} Task</button>
      {message && <p className="text-danger mt-3">{message}</p>}
    </form>
  );
};

export default TaskForm;
