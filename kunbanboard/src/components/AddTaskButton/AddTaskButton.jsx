import React, { useState } from 'react';
import './AddTaskButton.css';

const AddTaskButton = ({ onAddTask }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleAddTask = () => {
        if (taskTitle.trim() && taskDescription.trim()) {
            onAddTask({ title: taskTitle, description: taskDescription, status: 'To Do' });  // Use 'status' instead of 'stage'
            setTaskTitle('');
            setTaskDescription('');
            setModalOpen(false);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setTaskTitle('');
        setTaskDescription('');
    };

    return (
        <>
            <button className="add-task-button" onClick={() => setModalOpen(true)}>
                Add Task
            </button>
            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                <div className="modal">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Add New Task</h3>
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Task Description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                        <div className="buttons">
                            <button onClick={handleAddTask}>Add</button>
                            <button onClick={() => setModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddTaskButton;
