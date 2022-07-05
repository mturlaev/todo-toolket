import { createAction, createReducer } from "@reduxjs/toolkit";



const initalState = {
    todos: [
        {
            text: "поспать",
            completed: false
        },
        {
            text: "пойти домой",
            completed: true
        },
        {
            text: "пропустить задание",
            completed:false
        }
    ]
};

export const add = createAction("add")
export const deleted = createAction("delete")
export const complete = createAction("completed")

const todoReducer = createReducer(initalState, (builder) => {
    builder
    .addCase(add, (state, action) => {
        state.todos.unshift({
            text: action.payload,
        })
    })
    .addCase(deleted, (state, action) => {
         state.todos = state.todos.filter((item, index) => {
            if (index !== action.payload) return true
        })
    } )
    .addCase(complete, (state, action) => {
        state.todos[action.payload].completed = !state.todos[action.payload].completed
        console.log(state.todos[action.payload].completed)
    })
})

export default todoReducer