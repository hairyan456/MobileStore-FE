import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDetailUser } from '../../services/userService';
import { toast } from 'react-toastify';

const initialState = {
    info: {},
    access_token: '',
}

export const fetchDetailUser = createAsyncThunk('user/fetchDetailUser', async ({ id }) => {
    try {
        const res = await getDetailUser(id);
        return res?.DT; // payload
    } catch (error) {
        throw error;
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfo: (state, action) => {
            const { access_token, ...rest } = action.payload;
            state.info = rest;
            state.access_token = access_token;
        },
    },
    //xử lí Action liên quan API thì viết trong extraReducers
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetailUser.pending, (state, action) => {
                // console.log('Pending:', action.meta);
            })
            .addCase(fetchDetailUser.fulfilled, (state, action) => {
                // console.log('FULLFILLED')
            })
            .addCase(fetchDetailUser.rejected, (state, action) => {
                toast.error(action.error.message)
                console.error('Error:', action.error);
            })
    },

})

export const { updateUserInfo } = userSlice.actions
export default userSlice.reducer