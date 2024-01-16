import axios from "axios"
import {message} from 'ant-design-vue'
import moment from 'moment'

export default{
    state:{
        taskCounter:0,
        taskPickerName:'',
        tasks:[],
        tasksColumns:[],
        tasksUrl: 'http://192.168.1.131:3200/tasks',
        tasksForUpdate:[],
        tasksIsLoaded: false,
        tasksNeedToUpdate: false,
        tasksNeedToGet: false,
    },
    mutations:{
        SET_TASKPICKERNAME: (state, name) => {
            state.taskPickerName = name
        },
        SET_TASKS_TO_STATE: (state, tasks) => {
            state.tasks = tasks
            state.tasksIsLoaded = true
            state.tasksNeedToUpdate = false,
            state.tasksNeedToGet = false
        },
        SET_TASK_COLUMNS_TO_STATE: (state, tasksColumns) => {
            state.tasksColumns = tasksColumns
        },
        CHECK_EXPIREDTASKS: (state) => {
            if(state.tasksIsLoaded){
                let currentDate = moment().format('YYYY/MM/DD')
                let count = 0
                state.tasks.forEach(element => {
                    if(!(element.tags.includes('Выполнено'))){
                        if(!(element.tags.includes('Просрочено'))){
                            if(element.endDate<currentDate){
                                state.tasksNeedToGet=true
                                element.tags.push('Просрочено')
                                state.tasksForUpdate.push(count)
                            }
                        }
                    }                                        
                    count++;
                });
                state.tasksNeedToUpdate = state.tasksForUpdate.length>0 ? true : false
            }
        },
        CHECK_STARTEDTASKS: (state) => {
            if(state.tasksIsLoaded){
                let currentDate = moment().format('YYYY/MM/DD')
                let count = 0
                state.tasks.forEach(element => {
                    if(!(element.tags.includes('Выполнено'))){
                        if(!(element.tags.includes('В работе'))){
                            if(element.startDate<currentDate){
                                state.tasksNeedToGet=true
                                element.tags.push('В работе')
                                state.tasksForUpdate.push(count)
                            }
                        }
                    }                    
                    count++
                })
                state.tasksNeedToUpdate = state.tasksForUpdate.length>0 ? true : false
            }
        },
        CHANGE_TASK_COMPLETE: (state, id) => {
            if(state.tasksIsLoaded){
                if(state.tasks.at(id-1).tags.includes('В работе')){
                    state.tasks.at(id-1).tags.splice(state.tasks.at(id-1).tags.indexOf('В работе'),1)
                    console.log(state.tasks.at(id-1).tags)
                }
                if(state.tasks.at(id-1).tags.includes('Просрочено')){
                    state.tasks.at(id-1).tags.splice(state.tasks.at(id-1).tags.indexOf('Просрочено'),1)
                    console.log(state.tasks.at(id-1).tags)
                }
                if(!(state.tasks.at(id-1).tags.includes('Выполнено'))){
                    state.tasks.at(id-1).tags.push('Выполнено')
                    console.log(state.tasks.at(id-1).tags)
                }
            }
        },
        ADDTASKCOUNTER: (state) => {
            state.taskCounter++
        }
        },
    actions:{
        async ADD_TASKCOUNTER({commit}){
            commit('ADDTASKCOUNTER')
        },
        async SET_TASKPICKER_NAME({commit},name){
            commit('SET_TASKPICKERNAME',name)
        },
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
        async UPDATE_TASK({commit,state}){
            commit('CHECK_EXPIREDTASKS')
            if(state.tasksNeedToUpdate){
                while(state.tasksForUpdate.length>0){
                    let currentElement = state.tasksForUpdate.pop()
                    try {
                        const f = await axios.put(state.tasksUrl+'/'+(currentElement+1),state.tasks[currentElement])
                        console.log(f)
                        message.success('Атрибуты просроченных задач обновлены!')
                    } catch (error) {
                        message.error('Ошибка при обновлении атрибутов просроченной задачи!')
                        console.error(error)
                    }
                }
            }
            if(state.tasksNeedToGet){
                this.dispatch('GET_TASKS_FROM_API')
            }
        },
        async MAKE_TASKS_COMPLETED({commit,state},rowId){
            rowId.forEach(async element => {
                try{
                    commit('CHANGE_TASK_COMPLETE',element)
                    const m = await axios.put(state.tasksUrl+'/'+element,state.tasks.at(element-1))
                    console.log(m)
                    message.success('Атрибут "выполнено" назначен!',0.5)
                } catch(e){
                    message.error('Ошибка при назначении атрибута "выполнено"',5)
                }
            })
        },
        async UPDATE_IFSTARTED({commit,state}){
            commit('CHECK_STARTEDTASKS')
            if(state.tasksNeedToUpdate){
                while(state.tasksForUpdate.length>0){
                    let currentElement = state.tasksForUpdate.pop()
                    try {
                        const f = await axios.put(state.tasksUrl+'/'+(currentElement+1),state.tasks[currentElement])
                        console.log(f)
                        message.success('Атрибуты начатых задач обновлены!')
                    } catch (error) {
                        message.error('Ошибка при обновлении атрибутов начатой задачи!')
                        console.error(error)
                    }
                }
            }
            if(state.tasksNeedToGet){
                this.dispatch('GET_TASKS_FROM_API')
            }
        },
        async EDIT_TASK({state},task){
            try{
                const eu = await axios.put(state.tasksUrl+'/'+task.id, task)
                console.log(eu)
                message.success('Изменения внесены!',5)
                this.dispatch('GET_TASKS_FROM_API')
            }catch(e){
                message.error('Не удалось внести изменения!',5)
                console.error(e)
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
                const tasks = await axios('http://192.168.1.131:3200/tasks', {
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
                const tasksColumns = await axios('http://192.168.1.131:3200/tasksColumns', {
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
        },
        GET_TASKPICKERNAME(state){
            return state.taskPickerName
        },
        GET_TASKCOUNTER(state){
            return state.taskCounter
        }
    }
}
