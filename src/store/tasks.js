import axios from "axios"
import {message} from 'ant-design-vue'

export default{
    state:{
        tasks:[],
        tasksColumns:[],
        tasksUrl: 'http://localhost:3200/tasks'
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
        async ADD_NEWTASK({state},task){
            try{
                const j = await axios.post(state.tasksUrl, task)
                console.log(j)
                message.success('Новая задача добавлена!',5)
                this.dispatch('GET_TASKS_FROM_API')
            }catch(e){
                message.error('Ошибка при создании новой задачи!',5)
            }
        },
        async DELETE_TASKS_FROM_API({state},rowId){
            this.dispatch('GET_TASKS_FROM_API')
            rowId.forEach(async (element)=> {try{
                const j = await axios.delete(state.tasksUrl+'/'+element)
                console.log(j)
                message.success('Задача удалена!',5)
                this.dispatch('GET_TASKS_FROM_API')
            }catch(e){
                message.error('Ошибка при удалении задачи!',5)
            }
        })
        },
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
