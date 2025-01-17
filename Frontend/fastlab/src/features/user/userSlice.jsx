import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  lastName: '', // Asegúrate de incluir este campo
  email: '',
  phone: '',
  birth: '',  // Asegúrate de incluir este campo
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      const { id, name, lastName, email, phone,birth, token } = action.payload;
      state.id = id;
      state.name = name;
      state.lastName = lastName; // Guarda el apellido
      state.email = email;
      state.phone = phone; // Guarda el teléfono
      state.birth = birth;
      state.token = token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.id = null;
      state.name = '';
      state.lastName = ''; // Guarda el apellido
      state.email = '';
      state.phone = ''; // Guarda el teléfono
      state.birth = '';
      state.token = '';
      state.isAuthenticated = false;
    },
    updateData:(state, action)=>{
      const { firstName, lastName, birth, email, phone } = action.payload;
      state.name = firstName;
      state.lastName = lastName; // Guarda el apellido
      state.email = email;
      state.phone = phone; // Guarda el teléfono
      state.birth = birth;
    }

    
  },
});

export const { login, logout, updateData } = userSlice.actions;
export default userSlice.reducer;

