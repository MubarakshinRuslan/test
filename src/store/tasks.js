import axios from "axios"
import {message} from 'ant-design-vue'
import moment from 'moment'

export default{
    state:{
        tasks:[],
        tasksColumns:[],
        tasksUrl: 'http://localhost:3200/tasks',
        tasksForUpdate:[],
        tasksIsLoaded: false,
        tasksNeedToUpdate: false
    },
    mutations:{
        SET_TASKS_TO_STATE: (state, tasks) => {
            state.tasks = tasks
            state.tasksIsLoaded = true
            state.tasksNeedToUpdate = false
        },
        SET_TASK_COLUMNS_TO_STATE: (state, tasksColumns) => {
            state.tasksColumns = tasksColumns
        },
        CHECK_EXPIREDTASKS: (state) => {
            if(state.tasksIsLoaded){
                let currentDate = moment().format('YYYY/MM/DD')
                let count = 0
                state.tasks.forEach(element => {
                    if(!(element.tags.includes('Просрочено'))){
                        if(element.endDate<currentDate){
                            element.tags.push('Просрочено')
                            state.tasksForUpdate.push(count)
                        }
                    }                    
                    count++;
                });
                state.tasksNeedToUpdate = state.tasksForUpdate.length>0 ? true : false
            }
            console.log(state.tasks)
            
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
        async UPDATE_TASK({state, commit}){
            commit('CHECK_EXPIREDTASKS')
            if(state.tasksNeedToUpdate){
                while(state.tasksForUpdate.length>0){
                    let currentElement = state.tasksForUpdate.pop()
                    try {
                        const f = await axios.put(state.tasksUrl+'/'+(currentElement+1),state.tasks[currentElement])
                        console.log(f)
                        message.success('Обнаружена устаревшая задача!')
                    } catch (error) {
                        message.error('Ошибка при обновлении атрибутов устаревшей задачи!')
                        console.error(error)
                    }
                }
            }
        },
        async EDIT_TASK(){
            try{
                message.success('Задача успешно изменена')
            }catch(e){
                message.error('Ошибка при изменении задачи')
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
            console.log(`Вызвана async GET_TASKS_FROM_API`)
            try {
                const tasks = await axios('http://localhost:3200/tasks', {
                    method: "GET"
                })
                message.success('Данные таблицы задач загружены!')
                commit('SET_TASKS_TO_STATE', tasks.data)
                return tasks
            } catch (error) {
                message.error('Ошибка! Данные таблицы задач не загружены!')
                console.log(error)
                return error
            }
        },
        async GET_TASK_COLUMNS_FROM_API({commit}){
            try {
                const tasksColumns = await axios('http://localhost:3200/tasksColumns', {
                    method: "GET"
                })
                message.success('Таблица задач загружена!')
                commit('SET_TASK_COLUMNS_TO_STATE', tasksColumns.data)
                return tasksColumns
            } catch (error) {
                message.error('Ошибка! Таблица задач не загружена!')
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
