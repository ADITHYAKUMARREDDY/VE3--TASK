# Task Manager Application

A full-stack task management application built with React for the frontend and Node.js, Express, and MySQL for the backend. This app allows users to register, log in, add, view, edit, and delete tasks with JWT-based authentication.

---

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

---

## Demo
To see a live demo, visit [http://localhost:3000](http://localhost:3000) after running the app locally.

---

## Features
- User Registration and Login
- JWT Authentication
- Task CRUD (Create, Read, Update, Delete)
- Role-based Authorization

---

## Tech Stack
- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, MySQL
- **Authentication**: JWT (JSON Web Tokens)

---

## Prerequisites
- [Node.js](https://nodejs.org/) (version 14 or above)
- [MySQL](https://www.mysql.com/) (for database setup)

---

## Installation

### Clone the Repository
```
git clone https://github.com/yourusername/task-manager.git
cd task-manager



Backend Setup
Navigate to Backend Directory:



cd backend
Install Backend Dependencies:



npm install
Set up MySQL Database:

Open MySQL and run the following SQL command to create the database:
sql

CREATE DATABASE taskdb;
Run Database Migrations (if any):

Run SQL scripts for setting up tables, if provided in a migrations.sql file.
Environment Variables:

Create a .env file in the backend root with the following variables:
env

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=taskdb
JWT_SECRET=your_jwt_secret
Start the Backend Server:



npm start
The server should now be running on http://localhost:5000.
Frontend Setup
Navigate to Frontend Directory:



cd frontend
Install Frontend Dependencies:



npm install
Environment Variables:

Create a Config.js file in src with the backend endpoint:
javascript

const config = {
  backendEndpoint: "http://localhost:5000"
};
export default config;
Start the Frontend Server:



npm start
The frontend should now be running on http://localhost:3000.



Available Scripts
Backend Scripts
npm start: Starts the server on http://localhost:5000.
npm run dev: Starts the server with nodemon for development.
Frontend Scripts
npm start: Starts the React app on http://localhost:3000.
npm run build: Builds the React app for production to the build folder.



## API Documentation

### Auth Routes

- **Register**: `[POST] /auth/register`
  - **Description**: Registers a new user.
  - **Request Example**:
    ```json
    {
      "name": "John Doe",
      "username": "john",
      "password": "123456",
      "confirmPassword": "123456"
    }
    ```
  - **Response Example**:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **Login**: `[POST] /auth/login`
  - **Description**: Authenticates a user and returns a JWT token.
  - **Request Example**:
    ```json
    {
      "username": "john",
      "password": "123456"
    }
    ```
  - **Response Example**:
    ```json
    {
      "message": "Logged in",
      "token": "<jwt_token>"
    }
    ```

---

### Task Routes
> **Note**: All Task routes require an `Authorization` header with the format `Bearer <jwt_token>`.

- **Get All Tasks**: `[GET] /tasks`
  - **Description**: Retrieves all tasks for the authenticated user.
  - **Headers**:
    ```json
    {
      "Authorization": "Bearer <jwt_token>"
    }
    ```
  - **Response Example**:
    ```json
    [
      {
        "id": 1,
        "title": "Sample Task",
        "description": "This is a sample task description",
        "completed": false,
        "user_id": 1
      },
      {
        "id": 2,
        "title": "Another Task",
        "description": "Another task description",
        "completed": true,
        "user_id": 1
      }
    ]
    ```

- **Get Task by ID**: `[GET] /tasks/:id`
  - **Description**: Retrieves a specific task by its ID for the authenticated user.
  - **Headers**:
    ```json
    {
      "Authorization": "Bearer <jwt_token>"
    }
    ```
  - **Response Example**:
    ```json
    {
      "id": 1,
      "title": "Sample Task",
      "description": "This is a sample task description",
      "completed": false,
      "user_id": 1
    }
    ```

- **Add New Task**: `[POST] /tasks`
  - **Description**: Adds a new task for the authenticated user.
  - **Headers**:
    ```json
    {
      "Authorization": "Bearer <jwt_token>"
    }
    ```
  - **Request Example**:
    ```json
    {
      "title": "New Task",
      "description": "Details of the new task"
    }
    ```
  - **Response Example**:
    ```json
    {
      "message": "Task added"
    }
    ```

- **Update Task**: `[PUT] /tasks/:id`
  - **Description**: Updates an existing task by its ID for the authenticated user.
  - **Headers**:
    ```json
    {
      "Authorization": "Bearer <jwt_token>"
    }
    ```
  - **Request Example**:
    ```json
    {
      "title": "Updated Task",
      "description": "Updated details",
      "completed": true
    }
    ```
  - **Response Example**:
    ```json
    {
      "message": "Task updated"
    }
    ```

- **Delete Task**: `[DELETE] /tasks/:id`
  - **Description**: Deletes a specific task by its ID for the authenticated user.
  - **Headers**:
    ```json
    {
      "Authorization": "Bearer <jwt_token>"
    }
    ```
  - **Response Example**:
    ```json
    {
      "message": "Task deleted"
    }
    ```
---

Each endpoint requires the correct request format and headers. Ensure that the `Authorization` header contains a valid JWT token for authenticated routes. You can use a tool like **Postman** to test these endpoints by setting up the headers, method, and body accordingly.

