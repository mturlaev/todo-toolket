import { createAction, createReducer } from "@reduxjs/toolkit";



const initalState = {
    todos: [
        {
            text: "поспать",
        },
        {
            text: "пойти домой"
        },
        {
            text: "пропустить задание"
        }
    ]
};

export const add = createAction("add")
export const deleted = createAction("delete")

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
})

export default todoReducer