import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  lastName: '',
  email: '',
  token: null,
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    login(state, action) {
      const { id, name, lastName, email, token } = action.payload;
      state.id = id;
      state.name = name;
      state.lastName = lastName;
      state.email = email;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.id = null;
      state.name = '';
      state.lastName = '';
      state.email = '';
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = adminSlice.actions;
export default adminSlice.reducer;
