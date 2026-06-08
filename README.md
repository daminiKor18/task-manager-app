 ##Task Manager App

## Project Title & Brief Description

Task Manager App is a full-stack web application developed using React.js, Vite, Node.js, and Express.js.

The application allows users to efficiently manage daily tasks through features such as:

Task creation
Editing and deletion
Searching and filtering
Completion tracking

This project demonstrates:

Full-stack CRUD operations
REST API integration
Frontend–backend communication
File-based (JSON) data persistence using Node.js filesystem module

It is deployed using a separate frontend (Vercel) and backend (Render) architecture.

## Live Demo Links
Frontend Deployment

https://task-manager-app-ten-tawny.vercel.app/

Backend Deployment

https://task-manager-app-jwtv.onrender.com

API Base URL

https://task-manager-app-jwtv.onrender.com/tasks

##  Tech Stack

## Frontend Technologies
React.js

Used for building reusable UI components and managing application state efficiently.

Vite

Used as the frontend build tool and development server for fast performance and optimized development experience.

CSS

Used for styling the application and creating a responsive user interface.

##  Backend Technologies
Node.js

JavaScript runtime environment used for backend development.

Express.js

Used to build REST APIs and handle server-side routing.

CORS

Used to enable communication between frontend and backend hosted on different domains.

File System (fs)

Used for reading and writing tasks.json for file-based persistent storage.

## Deployment Platforms
Vercel

Used for frontend deployment.

Render

Used for backend deployment.

## Version Control
Git
GitHub

Git is used for version control and GitHub for repository hosting and project management.

## How to Run Locally
# Prerequisites

Make sure you have installed:

Node.js
npm

## Clone Repository
git clone https://github.com/daminiKor18/task-manager-app.git
cd task-manager-app

# Backend Setup
Navigate to Server Folder
cd server
Install Dependencies
npm install
Start Backend Server
node server.js

Backend runs on:

http://localhost:5000
# Frontend Setup

Open a new terminal window.

Navigate to Client Folder
cd client
Install Dependencies
npm install
Run Frontend
npm run dev

Frontend runs on:

http://localhost:5173

## API Documentation
Base URL

https://task-manager-app-jwtv.onrender.com


1. Fetch All Tasks
Method: GET
Endpoint: /tasks
Description: Retrieves all tasks stored in the backend.
Sample Response
[
  {
    "id": 1780909845548,
    "title": "Practice DSA",
    "description": "Solve 4 DSA questions",
    "dueDate": "2026-06-08",
    "completed": true
  }
]
2. Add New Task
Method: POST
Endpoint: /tasks
Description: Creates a new task.
Request Body
{
  "id": 1780909845548,
  "title": "Learn React",
  "description": "Practice React hooks",
  "dueDate": "2026-06-12",
  "completed": false
}
Response
{
  "message": "Task added successfully"
}

3. Update Task
Method: PUT
Endpoint: /tasks/:id
Description: Updates an existing task using its ID.
Response
{
  "message": "Task updated successfully"
}

4. Delete Task
Method: DELETE
Endpoint: /tasks/:id
Description: Deletes a task using its ID.
Response
{
  "message": "Task deleted successfully"
}

📁 Project Structure
task-manager-app/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── server.js
│   ├── tasks.json
│   └── package.json
│
├── .gitignore
└── README.md


📂 Folder Description

client/

Contains the React frontend including UI components, styling, and API integration.

server/

Contains the Express backend, REST APIs, and file-based storage logic.

tasks.json

Acts as a lightweight file-based database for storing tasks.

App.jsx

Main frontend component handling state management, API calls, and task operations.

App.css

Handles styling and responsive UI design.

## Features

1.Add new tasks
2.Edit existing tasks
3.Delete tasks
4.Toggle task completion
5.Search tasks dynamically
6.Filter tasks by status
7.Due date management
8.Overdue task detection
9.File-based persistent storage
10.REST API integration
11.Responsive UI design
12.Full-stack deployment

## Challenges Faced

Frontend–backend integration
Handling asynchronous API requests
Deploying frontend and backend separately
Configuring production API URLs
Managing file-based data persistence

## Learning Outcomes

Through this project, I learned:

Full-stack web development
REST API design and integration
React state management using hooks
Express.js backend development
Git and GitHub workflow
Deployment using Vercel and Render
Debugging real-world full-stack issues
## Next Steps / Future Improvements

User authentication and authorization
MongoDB integration
Drag and drop task management
Dark mode support
Task priority system
Notifications and reminders
Real-time updates

# Author

Damini Koranga