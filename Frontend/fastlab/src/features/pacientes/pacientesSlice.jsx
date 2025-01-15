import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lista:[]
};

const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    getAllPacientes(state, action) {
      state.lista = action.payload;
      
    },
    addPaciente: (state, {payload}) => {
      state.lista.push(payload)
    }
    
  },
});

export const { getAllPacientes, addPaciente } = pacientesSlice.actions;
export default pacientesSlice.reducer;

