# Task Manager Application

This guide will help you clone the repository, set up the backend and frontend, and start the application. Additionally, it provides instructions on how to make changes in the footer and update backend MongoDB details.

## Prerequisites
Ensure you have the following installed on your system:
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or cloud instance)

---

## Cloning the Repository

1. Open a terminal and navigate to the directory where you want to clone the project.
2. Run the following command:
   ```bash
   git clone <repository-url>
   ```
   Replace `<repository-url>` with the URL of the Git repository.
3. Navigate into the project directory:
   ```bash
   cd kunbanboard
   ```

---

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd task-manager-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update the MongoDB connection string in `server.js`:
   ```javascript
   const mongoose = require('mongoose');

   mongoose.connect('<your-mongodb-connection-string>', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   }).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Error connecting to MongoDB', err));
   ```
   Replace `<your-mongodb-connection-string>` with your MongoDB URI.
4. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:5000` by default.

---

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd task-manager-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000` by default.

---

## Making Changes in the Footer

1. Open the footer component file located in the frontend directory:
   ```bash
   src/components/Board/Board.jsx
   ```
2. Modify the desired text or content in the footer.
3. Save your changes, and the frontend will automatically reload if the development server is running.

---

## Updating MongoDB Details

1. Open the `server.js` file located in the backend directory:
   ```bash
   task-manager-backend/server.js
   ```
2. Locate the MongoDB connection string and update it:
   ```javascript
   mongoose.connect('<your-mongodb-connection-string>', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   });
   ```
   Replace `<your-mongodb-connection-string>` with the URI of your MongoDB database.
3. Restart the backend server to apply changes:
   ```bash
   npm start
   ```

---

## Running the Full Application

1. Ensure both the backend and frontend servers are running:
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:3000`
2. Open your browser and navigate to `http://localhost:3000` to use the application.

---

## Additional Notes
- Always ensure MongoDB is running (locally or in the cloud) before starting the backend.
- Use a `.env` file to securely store sensitive details like the MongoDB URI.

---

Enjoy using the Task Manager Application!
