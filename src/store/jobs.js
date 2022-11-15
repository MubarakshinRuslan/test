import { message } from 'ant-design-vue'
import axios from 'axios'

export default{
    state:{
        jobs:[],
        jobCols:[],
        jobsUrl: 'http://localhost:3200/jobs'
    },
    actions:{
        async ADD_NEWJOB({state},job){
            try{
                const j = await axios.post(state.jobsUrl,job)
                console.log(j)
                message.success('Новая должность добавлена!',5)
                this.dispatch('GET_JOBS_FROM_API')
            }catch(e){
                message.error('Ошибка при добавлении новой должности!',5)
        }
        },
        async DELETE_JOB_FROM_API({state},rowId){
            this.dispatch('GET_JOBS_FROM_API')
            rowId.forEach(async (element)=> {try{
                const j = await axios.delete(state.jobsUrl+'/'+element)
                console.log(j)
                message.success('Запись удалена',5)
                this.dispatch('GET_JOBS_FROM_API')
            }catch(e){
                message.error('Ошибка при удалении должности!',5)
            }
        })
        },
        async GET_JOBS_FROM_API({commit}){
            try{
                const jobs = await axios('http://localhost:3200/jobs',{
                    method: "GET"
                })
                message.success('Данные таблицы должностей загружены!')
                commit('SET_JOBS_TO_STATE', jobs.data)
                return jobs
            }catch(error){
                message.error('Ошибка! Данные таблицы должностей не загружены')
                console.error(error)
                return error
            }
        },
        async GET_JOB_COLS_FROM_API({commit}){
            try{
                const jobCols = await axios('http://localhost:3200/jobcols',{
                    method: "GET"
                })
                message.success('Таблица должностей загружена!')
                commit('SET_JOB_COLS_TO_STATE',jobCols.data)
                return jobCols
            }catch(error){
                message.error('Ошибка! Таблица должностей не загружена!')
                console.error(error)
                return error
            }
        }
    },
    mutations:{
        SET_JOBS_TO_STATE: (state, jobs) => {
            state.jobs = jobs
        },
        SET_JOB_COLS_TO_STATE: (state, jobCols) => {
            state.jobCols = jobCols
        }
    },
    getters:{
        JOBS (state){
            return state.jobs
        },
        JOB_COLS (state) {
            return state.jobCols
        }
    }
}