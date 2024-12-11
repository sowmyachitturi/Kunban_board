import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './Task.css';

const Task = ({ task, index, openModal, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(task._id);
    } else {
      console.error('Delete handler is not defined');
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-content">
            <div className="title-disc">
              <h3>{task.title}</h3>
              <p className="task-description">{task.description}</p>
            </div>
            <div className="task-buttons">
              <button className="delete-task-btn" onClick={handleDelete}>
              </button>
              <button
                className="view-task-btn"
                onClick={() => openModal(task)}
              >
                <i className="fa fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
