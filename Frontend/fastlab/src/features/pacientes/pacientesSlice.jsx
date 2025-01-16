import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lista:[]
};

const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    setAllPacientes(state, action) {
      state.lista = action.payload;
      
    },
    addPaciente: (state, {payload}) => {
      state.lista.push(payload)
    }
    
  },
});

export const { setAllPacientes, addPaciente } = pacientesSlice.actions;
export default pacientesSlice.reducer;

