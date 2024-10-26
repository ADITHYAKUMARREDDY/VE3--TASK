import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">Task Manager</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {!token ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Task List</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/add-task">Add Task</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link text-white" onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div className="flex-grow-1">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/" element={token ? <TaskList /> : <Navigate to="/login" />} />
            <Route path="/task/:id" element={token ? <TaskDetails /> : <Navigate to="/login" />} />
            <Route path="/add-task" element={token ? <TaskForm /> : <Navigate to="/login" />} />
            <Route path="/edit-task/:id" element={token ? <TaskForm /> : <Navigate to="/login" />} />
          </Routes>
        </div>

        <footer className="bg-light text-center py-3">
          <p className="mb-0">Developed by Adithya Kumar Reddy | VE3 Task</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
