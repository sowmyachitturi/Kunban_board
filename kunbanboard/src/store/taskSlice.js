import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push({ ...action.payload, id: Date.now().toString() });
    },
    moveTask(state, action) {
      const { taskId, newStage } = action.payload;
      const task = state.tasks.find((t) => t.id === taskId);
      if (task) {
        task.stage = newStage;
      }
    },
  },
});

export const { addTask, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
