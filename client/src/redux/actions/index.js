export const addTask = (task) => ({
    type: "ADD_TASK",
    payload:task
})

 
export const delTask = (taskID) => ({
    type: "DEL_TASK",
    payload:taskID
})
