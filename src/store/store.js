import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todoSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: { todos: todoReducer, ui: uiReducer },
})
