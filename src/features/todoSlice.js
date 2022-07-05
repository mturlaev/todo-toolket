import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoReducer from "./todoReducer";


export const fetchTodos = createAsyncThunk( "todos/fetch", async (_, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:4000/todo")
        const data = await res.json();
        return data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
});
//

export const postTodos = createAsyncThunk("todos/post", async (text, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:4000/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({text})
        })
        const data = await res.json();
        return data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
});

export const patchTodos = createAsyncThunk("todos/patch", async ({id, completed}, thunkAPI) => {
    try {
        const res = await fetch(`http://localhost:4000/todo/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({completed: !completed})
        })
        const data = await res.json();
        return data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message)
    }
});

export const deleteTodos = createAsyncThunk("todos/delete", async (id, thunkAPI) => {
    const res = await fetch(`http://localhost:4000/todo/${id}`, {
        method: "DELETE",
    });
    return id
})



const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        error: null,
        loading: false
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload;
            state.loading = false;
        })
        .addCase(fetchTodos.rejected , (state, action) => {
            state.error = action.payload
            state.loading = false;

        })
        .addCase(fetchTodos.pending, (state, action) => {
            state.loading = true
        })
        .addCase(postTodos.fulfilled, (state, action) => {
            state.todos.unshift(action.payload)
            state.loading = false;

        })
        .addCase(postTodos.rejected , (state, action) => {
            state.error = action.payload
            state.loading = false
        })
        .addCase(postTodos.pending, (state, action) => {
            state.loading = true
        })
        .addCase(patchTodos.fulfilled, (state, action) => {
            state.todos = state.todos.map((item) => {
                if(item._id === action.payload._id) {
                    item.completed = !item.completed
                    return item
                }
                return item
            })
            state.loading = false;

        })
        .addCase(patchTodos.rejected , (state, action) => {
            state.error = action.payload
            state.loading = false;

        })
        .addCase(patchTodos.pending, (state, action) => {
            state.loading = true
        })
        .addCase(deleteTodos.fulfilled, (state,action) => {
            state.todos = state.todos.filter((item) => {
                if(item._id !== action.payload) {
                    return item
                }
            })
            state.loading = false;
        })
        .addCase(deleteTodos.rejected , (state, action) => {
            state.error = action.payload
            state.loading = false;
        })
        .addCase(deleteTodos.pending, (state, action) => {
            state.loading = true
        })
    }
});

export default todoSlice.reducer;