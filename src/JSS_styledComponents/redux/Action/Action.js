import { ADD_TASK, CHANGE_THEME, CHECK_DONE_TASK, CHECK_UNDONE_TASK, DELETE_TASK, GET_TASK_EDIT, PUT_TASK_EDIT } from "../constant/constant";

export const changeThemeAction = (theme) => ({
    type: CHANGE_THEME,
    payload: theme
});

export const addTaskAction = (task) => ({
    type: ADD_TASK,
    payload: task
});

export const checkDoneTaskAction = (id) => ({
    type: CHECK_DONE_TASK,
    payload: id
});

export const checkUnDoneTaskAction = (id) => ({
    type: CHECK_UNDONE_TASK,
    payload: id
});

export const checkDeleteTaskAction = (id) => ({
    type: DELETE_TASK,
    payload: id
});

export const GetTaskEditAction = (id) => ({
    type: GET_TASK_EDIT,
    payload: id
});
export const putTaskEditAction = (task) => ({
    type: PUT_TASK_EDIT,
    payload: task
});