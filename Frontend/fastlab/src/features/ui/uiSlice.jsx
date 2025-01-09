import { createSlice } from '@reduxjs/toolkit';

// Estado inicial para errores
const initialState = {
  errorMessage: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setError(state, action) {
      state.errorMessage = action.payload;
    },
    clearError(state) {
      state.errorMessage = null;
    },
  },
});

// Exportar las acciones y el reducer
export const { setError, clearError } = uiSlice.actions;
export default uiSlice.reducer;
