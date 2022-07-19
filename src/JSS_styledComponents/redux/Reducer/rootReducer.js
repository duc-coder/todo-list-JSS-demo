import { combineReducers } from "redux";
import { TodoListJSSReducer } from "./TodoListJSSReducer";

export const rootReducer = combineReducers({
    TodoListJSSReducer: TodoListJSSReducer
})