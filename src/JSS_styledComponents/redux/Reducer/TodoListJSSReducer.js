import { darkTheme, themeArr } from "../../Themes/configTheme";
import { ADD_TASK, CHANGE_THEME, CHECK_DONE_TASK, CHECK_UNDONE_TASK, DELETE_TASK, GET_TASK_EDIT, PUT_TASK_EDIT } from "../constant/constant"

const initialState = {
    theme: darkTheme,
    taskList: [
        {
            id: "1",
            taskName: "task 1",
            status: true
        },
        {
            id: "2",
            taskName: "task 2",
            status: true
        },
        {
            id: "3",
            taskName: "task 3",
            status: false
        },
        {
            id: "4",
            taskName: "task 4",
            status: false
        }
    ],
    taskEdit: {}
}

export const TodoListJSSReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_THEME: {
            let theme = themeArr.find(theme => theme.id == payload);
            if (theme) {
                state.theme = { ...theme.theme };
            }
            return { ...state }
        }

        case ADD_TASK: {
            let newTask = [...state.taskList];
            newTask.push(payload);
            state.taskList = newTask;
            return { ...state }
        }

        case CHECK_DONE_TASK: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === payload);
            if (index !== -1) {
                taskListUpdate[index].status = true;
            };
            return { ...state, taskList: taskListUpdate }
        }

        case CHECK_UNDONE_TASK: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === payload);
            if (index !== -1) {
                taskListUpdate[index].status = false;
            };
            return { ...state, taskList: taskListUpdate }
        }

        case DELETE_TASK: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === payload);
            if (index !== -1) {
                taskListUpdate.splice(index, 1);
            };
            return { ...state, taskList: taskListUpdate }
        }

        case GET_TASK_EDIT: {
            return { ...state, taskEdit: payload }
        }

        case PUT_TASK_EDIT: {
            state.taskEdit = {...state.taskEdit, taskName: payload};
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id)
            if (index !== 1) {
                taskListUpdate[index] = state.taskEdit;
            }

            state.taskList = taskListUpdate;
            return { ...state }
        }

        default:
            return state
    }
}
