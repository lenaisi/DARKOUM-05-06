import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import cookie from 'js-cookie';

// Thunk pour récupérer les données utilisateur
export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const response = await axios.get('http://localhost:5000/jwtid'); // Modifier l'URL si nécessaire
  return response.data;
});

// Thunk pour la déconnexion
export const logoutUser = () => async (dispatch) => {
  try {
    await axios({
      method: 'get',
      url: "http://localhost:5000/api/v1/auth/logout",
      withCredentials: true
    });

    cookie.remove('jwt', { expires: 1 });

    Object.keys(localStorage).forEach(key => {
      if (key !== 'persist:root') {
        localStorage.removeItem(key);
      }
    });

    dispatch(userLogout());
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  role: '',
  loading: false,
  error: false,
  status: 'idle'
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    userLogout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.isAuthenticated = false;
      state.role = '';
      state.status = 'idle';
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { loginStart, loginSuccess, loginFailure, userLogout, updateUser } = userSlice.actions;

export default userSlice.reducer;
