import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import AddTaskButton from './components/AddTaskButton/AddTaskButton';
import Board from './components/Board/Board';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (task) => {
    axios
      .post('http://localhost:5001/api/tasks', task)
      .then((response) => {
        setTasks((prevTasks) => [...prevTasks, response.data]);
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId;

    axios
      .put(`http://localhost:5001/api/tasks/${draggableId}`, { status: newStatus })
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task._id === draggableId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks); // Update the state to re-render the UI
      })
      .catch((error) => console.error('Error updating task status:', error));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteTask = (taskId) => {
    console.log("Task ID being deleted:", taskId);
    axios
      .delete(`http://localhost:5001/api/tasks/${taskId}`)
      .then((response) => {
        console.log('Task deleted:', response.data);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };


  return (
    <div className="app">
      <div className="header">
        <div className='header-div'>
          <h1>Task Manager</h1>
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <div className="add-task-button-container">
          <AddTaskButton onAddTask={handleAddTask}/>
        </div>
      </div>
      <Board tasks={filteredTasks} onDragEnd={handleDragEnd} onDelete={handleDeleteTask} />
      
      <footer className="footer">
      <div className="footer-content">
        <div className="copyright">
          <p>© 2024 Task Manager. All rights reserved.</p>
        </div>
        <div className="contact-links">
          <a href="https://github.com/sowmyachitturi" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/chitturi-sowmya-5a257224b/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:sowmyachitturi340@gmail.com">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default App;
