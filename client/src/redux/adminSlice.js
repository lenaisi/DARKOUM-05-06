import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import cookie from "js-cookie";

export const fetchAdminData = createAsyncThunk('admin/fetchAdminData', async (_, thunkAPI) => {
    try {
        const response = await axios.get('http://localhost:5000/jwtid', { withCredentials: true });
        return response.data; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const logoutAdmin = () => async (dispatch) => {
    try {
        await axios({
            method: 'get',
            url: "http://localhost:5000/api/v1/admin/logout",
            withCredentials: true
        });

        cookie.remove('jwt', { expires: 1 });

        Object.keys(localStorage).forEach(key => {
            if (key !== 'persist:root') {
                localStorage.removeItem(key);
            }
        });
        
        dispatch(adminLogout());
    } catch (err) {
        console.log(err);
    }
};

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        role: '',
        admin: null, 
        status: 'idle',
        error: null,
    },
    reducers: {
        adminLogout: (state) => {
            state.role = '';
            state.admin = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchAdminData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAdminData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.admin = action.payload;
        })
        .addCase(fetchAdminData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    },
});

export const { adminLogout } = adminSlice.actions;

export default adminSlice.reducer;
