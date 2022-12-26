import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    loading: false,
    todo: [],
    selectedTodo: [],
    error: ''
};

const PROXY = 'http://localhost:5000/api/v1'

export const fetchTodo = createAsyncThunk('todo/fetchTodo', async () => {
    try {
        const data = await axios.get(`${PROXY}/todo`);
        const result = data;
        return result.data.data;
    } catch (error) {
        toast.error("Somthing went wrong");
    }
});

export const UpdateTodo = createAsyncThunk('todo/UpdateTodo', async ({ id, todoField, dispatch }) => {
    try {
        const obj = {
            task: todoField
        }
        const data = await axios.patch(`${PROXY}/todo/${id}`, obj);
        const result = data;
        toast.success("Todo Successfully updated");
        dispatch(fetchTodo());
        return result.data.data;
    } catch (error) {
        toast.error("Somthing went wrong");
    }
});

export const UpdateTodoStatus = createAsyncThunk('todo/UpdateTodo', async ({ id, Tododata, dispatch }) => {
    try {
        const obj = {}

        if (Tododata.completed == true) {
            obj.completed = false;
        } else if (Tododata.completed == false) {
            obj.completed = true;
        }

        const data = await axios.patch(`${PROXY}/todo/updatestatus/${id}`, obj);
        const result = data;
        toast.success("Todo status Successfully updated");
        dispatch(fetchTodo());
        return result.data.data;
    } catch (error) {
        toast.error("Somthing went wrong");
    }
});

export const createTodo = createAsyncThunk('todo/createTodo', async ({ todoField, dispatch }) => {
    try {
        const obj = {
            task: todoField
        }
        const data = await axios.post(`${PROXY}/todo`, obj);
        const result = data;
        dispatch(fetchTodo());
        return result.data.data;
    } catch (error) {
        toast.error("Somthing went wrong");
    }
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id) => {
    try {
        await axios.delete(`${PROXY}/todo/${id}`);
        toast.success("Todo Successfully deleted");
        return id;
    } catch (error) {
        toast.error("Somthing went wrong");
    }
});

export const getTodoById = createAsyncThunk('todo/getTodoById', async (id) => {
    try {
        const data = await axios.get(`${PROXY}/todo/${id}`);
        const result = data;
        return result.data.data.findTodoById;
    } catch (error) {
        toast.error("Somthing went wrong");
    }
});

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchTodo.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todo = action.payload
            state.error = ''
        })
        builder.addCase(fetchTodo.rejected, (state, action) => {
            state.loading = false
            state.todo = []
            state.error = action.error.message
        })
        builder.addCase(deleteTodo.pending, state => {
            state.loading = true
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todo = state.todo.filter(todoItem => todoItem._id !== action.payload);

        })
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(getTodoById.pending, state => {
            state.loading = true
        })
        builder.addCase(getTodoById.fulfilled, (state, action) => {
            state.selectedTodo = action.payload
            state.loading = true
            state.error = null
        })
        builder.addCase(getTodoById.rejected, state => {
            state.loading = false
        })
        builder.addCase(UpdateTodo.pending, state => {
            state.loading = true
        })
        builder.addCase(UpdateTodo.fulfilled, (state, action) => {
            state.selectedTodo = [];
            state.loading = false
        })
        builder.addCase(UpdateTodo.rejected, state => {
            state.loading = false
        })
    }
})

export default todoSlice.reducer;