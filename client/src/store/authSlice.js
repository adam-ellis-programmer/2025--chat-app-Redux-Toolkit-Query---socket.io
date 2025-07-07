import { createSlice } from '@reduxjs/toolkit'

// Check localStorage for existing user info
const initialState = {
  // // find string and parse to js object
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  // use cookies instead of local storage
  isAuthenticated: localStorage.getItem('userInfo') ? true : false,
  testState: true,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set user credentials and save to localStorage
    setCredentials: (state, action) => {
      // Redux state = Fast access while using the app
      // localStorage = Survives page refreshes
      state.userInfo = action.payload
      state.isAuthenticated = true
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },

    // Clear user credentials and localStorage
    logout: (state) => {
      state.userInfo = null
      state.isAuthenticated = false
      localStorage.removeItem('userInfo')
      // Don't clear everything - just user info
    },

    // Update user profile
    updateProfile: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload }
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
  },
})

export const { setCredentials, logout, updateProfile } = authSlice.actions
export default authSlice.reducer

/*
EXPLANATION:
- Manages CLIENT-SIDE auth state only
- Persists user info in localStorage
- No API calls here - pure client state
- Survives page refreshes
*/
