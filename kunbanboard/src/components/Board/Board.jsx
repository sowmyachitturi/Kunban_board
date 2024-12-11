import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Task from '../Task/Task';
import './Board.css';

const Board = ({ tasks, onDragEnd, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const stages = ['To Do', 'In Progress', 'Peer Review', 'Done'];

  const openModal = (task) => {
    setSelectedTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {stages.map((stage) => (
            <Droppable key={stage} droppableId={stage}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="kanban-column"
                >
                  <div className="column-header">
                    <h2>{stage}</h2>
                  </div>
                  <div className="tasks-container">
                    {tasks
                      .filter((task) => task.status === stage)
                      .map((task, index) => (
                        <Task
                          key={task._id}
                          task={task}
                          index={index}
                          openModal={openModal}
                          onDelete={onDelete}
                        />
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {showModal && selectedTask && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  className="edit-title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                  className="edit-description"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </>
            ) : (
              <>
                <h2>{selectedTask.title}</h2>
                <div className="status">
                  <strong>Status:</strong> {selectedTask.status}
                </div>
                <div className="description-container">
                  <p>{selectedTask.description}</p>
                </div>
              </>
            )}

            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
