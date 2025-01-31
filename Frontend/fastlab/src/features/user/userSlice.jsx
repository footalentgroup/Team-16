import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    name: '',
    lastName: '',
    email: '',
    phone: '',
    birth: '',
    token: null,
    isAuthenticated: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            const { id, name, lastName, email, phone, birth, token } = action.payload
            state.id = id
            state.name = name
            state.lastName = lastName
            state.email = email
            state.phone = phone
            state.birth = birth
            state.token = token
            state.isAuthenticated = true
        },
        logout: state => {
            state.id = null
            state.name = ''
            state.lastName = ''
            state.email = ''
            state.phone = ''
            state.birth = ''
            state.token = ''
            state.isAuthenticated = false
        },
        updateData: (state, action) => {
            const { id, name, lastName, email } = action.payload
            state.id = id
            state.name = name
            state.lastName = lastName
            state.email = email
        },
    },
})

export const { login, logout, updateData } = userSlice.actions
export default userSlice.reducer
