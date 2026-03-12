import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: localStorage.getItem('codeleap_user') || '',
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      localStorage.setItem('codeleap_user', action.payload); // LocalStorage permanent login
    },
    logout: (state) => {
      state.username = '';
      localStorage.removeItem('codeleap_user');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;