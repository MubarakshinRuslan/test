import axios from "axios"

export default{
    state:{
        tasks:[],
        tasksColumns:[]
    },
    mutations:{
        SET_TASKS_TO_STATE: (state, tasks) => {
            state.tasks = tasks
        },
        SET_TASK_COLUMNS_TO_STATE: (state, tasksColumns) => {
            state.tasksColumns = tasksColumns
        }
    },
    actions:{
        async GET_TASKS_FROM_API({commit}){
            try {
                const tasks = await axios('http://localhost:3200/tasks', {
                    method: "GET"
                })
                commit('SET_TASKS_TO_STATE', tasks.data)
                return tasks
            } catch (error) {
                console.log(error)
                return error
            }
        },
        async GET_TASK_COLUMNS_FROM_API({commit}){
            try {
                const tasksColumns = await axios('http://localhost:3200/tasksColumns', {
                    method: "GET"
                })
                commit('SET_TASK_COLUMNS_TO_STATE', tasksColumns.data)
                return tasksColumns
            } catch (error) {
                console.log(error)
                return error
            }
        }
    },
    getters:{
        TASK_COLS (state){
            return state.tasksColumns
        },
        TASKS (state) {
            return state.tasks
        },
        STARTED_TASKS (state) {
          return state.tasks.filter(i => {
            return i.isStarted
          })  
        }
    }
}
