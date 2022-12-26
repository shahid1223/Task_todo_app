import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: false,
    detail: null,
    error: ''
};

export const addDetails = createAsyncThunk('detail/post', async (formData) => {
    const data = await axios.post('http://localhost:5000/api/v1/detail/', formData)
    const result = data;
    // if(data.resulutObj.code === 200){}
    return result.data.resulutObj;
    // return result.data.map((user) => user.id);
});

const detaillice = createSlice({
    name: 'detail',
    initialState,
    extraReducers: builder => {
        builder.addCase(addDetails.pending, state => {
            state.loading = true
        })
        builder.addCase(addDetails.fulfilled, (state, action) => {
            state.loading = false
            state.detail = action.payload
            state.error = ''
        })
        builder.addCase(addDetails.rejected, (state, action) => {
            state.loading = false
            state.detail = null
            state.error = action.error.message
        })
    }
})

export default detaillice.reducer;