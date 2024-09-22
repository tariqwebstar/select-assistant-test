# Task Management System

This is a simple task management system with authentication and authorization. It allows users to sign up, log in, and manage tasks. The project is built with a Node.js/Express backend and a React frontend. MongoDB is used for data storage, and JWT is used for user authentication.

## Task Manager Backend

Clone the repository

```bash
git clone <repository-url>
cd task-manager-backend
```

Install dependencies

```bash
npm install
```

Setup environment variables: copy .env.example file in the task-manager-backend directory and configure the following:

```bash

MONGO_URI=mongodb://localhost:27017/task-manager-db
JWT_SECRET=your_jwt_secret
PORT=5001
```

Run the backend server

```bash
npm start
```

##

## Task Manager Frontend

Change the directory

```bash
cd task-manager-frontend
```

Install dependencies

```bash
npm install
```

Run the backend server

```bash
npm start
```
