// src/utils/localStorageHelper.js
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('tasks');
      if (serializedState === null) {
        return undefined;
      }
      return { tasks: JSON.parse(serializedState) };
    } catch (err) {
      console.error("Could not load state from localStorage:", err);
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state.tasks);
      localStorage.setItem('tasks', serializedState);
    } catch (err) {
      console.error("Could not save state to localStorage:", err);
    }
  };
