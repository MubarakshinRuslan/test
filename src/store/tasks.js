import axios from "axios"
import {message} from 'ant-design-vue'
import moment from 'moment'

export default{
    state:{
        tasks:[],
        tasksColumns:[],
        tasksUrl: 'http://localhost:3200/tasks',
        tasksForUpdate:[]
    },
    mutations:{
        SET_TASKS_TO_STATE: (state, tasks) => {
            state.tasks = tasks
        },
        SET_TASK_COLUMNS_TO_STATE: (state, tasksColumns) => {
            state.tasksColumns = tasksColumns
        },
        CHECK_EXPIREDTASKS: (state) => {
            console.log('-----------ВЫЗВАНА МУТАЦИЯ CHECK_EXPERIEDTASKS')
            let current = moment().format('YYYY/MM/DD')
            console.log(`tasks.js: мутация check_expiredtasks : Текущая дата ${current}`)
            let curDate = current.split('/')
            console.log(`tasks.js: мутация check_expiredtasks : Переменная ${curDate}`)
            let counter=0;
            console.log(`tasks.js: мутация check_expiredtasks : Счетчик ${counter}`)
            console.log(`
                tasks.js: мутация check_expiredtasks: Проверка State.Tasks: ${state.tasks}
            `)
            state.tasks.forEach(function (element) {
                console.log(`tasks.js: мутация check_expiredtasks : стрелочная функция внутри forEach: Счетчик ${counter}`)
                console.log(`//...// Вывод условия: ${element.isExpired}`)
                if (element.isExpired == false) {
                    let x = element.endDate.split('/')
                    console.log(`tasks.js: мутация check_expiredtasks : стрелочная функция внутри forEach: Условие выполняется: Переменная x: ${x}`)
                    if (x[0] < curDate[0]) {
                        element.isExpired = true
                    } else if (x[0] === curDate[0] && x[1] < curDate[1]) {
                        element.isExpired = true
                    } else if (x[0] === curDate[0] && x[1] === curDate[1] && x[2] < curDate[2]) {
                        element.isExpired = true
                    }
                    if (element.isExpired) {
                        element.tags.push('Просрочено')
                        state.tasksForUpdate.push(counter)
                    }
                    counter++
                }
            })
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
            console.log(`Вызвана async GET_TASKS_FROM_API`)
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
        },
        async CHECK_EXPIREDTASKS_AND_UPDATE_TAGS({commit,state, getters}){
            console.log('_----Вызвана async CHECK_EXPIREDTASKS_AND_UPDATE_TAGS')
            console.log(`ASYNC CHECK_EXPIREDTASKS_AND_UPDATE_TAGS: State.tasksForUpdate перед dispatch:`)
            console.log(state.tasksForUpdate)
            console.log(`ASYNC CHECK_EXPIREDTASKS_AND_UPDATE_TAGS: getters.tasks перед dispatch: ${getters.TASKS}.`)
            this.dispatch('GET_TASKS_FROM_API')
            console.log(`ASYNC CHECK_EXPIREDTASKS_AND_UPDATE_TAGS: State.tasksForUpdate после dispatch: ${state.tasksForUpdate}.`)
            console.log(state.tasksForUpdate)
            console.log(`ASYNC CHECK_EXPIREDTASKS_AND_UPDATE_TAGS: getters.tasks после dispatch: ${getters.TASKS}.`)
            commit('CHECK_EXPIREDTASKS')
            console.log(state.tasksForUpdate)
            if(state.tasksForUpdate.length>0){
                state.tasksForUpdate.forEach(async (element)=>{
                    try{
                        const res = await axios.put(state.tasksUrl+'/'+state.tasks.element.id,state.tasks.element)
                        console.log('Updating '+element+'-th element')
                        console.log(res)
                        message('Обнаружены новые просроченные задачи!')
                    }catch(e){
                        console.error(e)
                    }
                })
                state.tasksForUpdate=[]
            }
            this.dispatch('GET_TASKS_FROM_API')
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
