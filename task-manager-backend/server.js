const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://sowmyachitturi:So131103@cluster0.79ihe.mongodb.net/?retryWrites=true&w=majority",
    {
      serverSelectionTimeoutMS: 5000, // Wait up to 5 seconds for server selection
      socketTimeoutMS: 45000,       // Close sockets after 45 seconds of inactivity
      tls: true,                    // Use TLS/SSL for the connection
      retryWrites: true             // Automatically retry write operations
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "To Do" },
  createdAt: { type: Date, default: Date.now },
});

// Task Model
const Task = mongoose.model("Task", taskSchema);

// Routes
// Get tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send("Error retrieving tasks");
  }
});

// Add new task
app.post("/api/tasks", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).send("Error adding task");
  }
});

// Update task status when task is dragged to a new column
app.put("/api/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body; // The new status from the frontend

  try {
    const validStatuses = ["To Do", "In Progress", "Peer Review", "Done"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true } // Return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask); // Send the updated task back as response
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ message: "Error updating task" });
  }
});

app.delete("/api/tasks/:taskId", (req, res) => {
  const { taskId } = req.params;
  console.log('Received taskId:', taskId);
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }
  Task.findByIdAndDelete(taskId)
    .then((deletedTask) => {
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.status(200).json({ message: 'Task deleted successfully' });
    })
    .catch((error) => res.status(500).json({ message: 'Error deleting task', error }));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
