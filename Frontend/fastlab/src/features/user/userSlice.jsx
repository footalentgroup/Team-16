import { createSlice } from '@reduxjs/toolkit';

// Estado inicial para el usuario
const initialState = {
  id: null,
  name: '',
  email: '',
  token: null,
  isAuthenticated: false,
};

// Slice para manejar el estado del usuario
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
        const { id, name, email, token } = action.payload;
        state.id = id;
        state.name = name;
        state.email = email;
        state.token = token; // Guarda el token en Redux
        state.isAuthenticated = true;
      
        // También guarda el token en localStorage para persistencia manual
        localStorage.setItem('token', token);
      },
      
    logout(state) {
      state.id = null;
      state.name = '';
      state.email = '';
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Exportar las acciones y el reducer
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
