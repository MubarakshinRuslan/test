import axios from 'axios'

export default{
    state:{
        jobs:[],
        jobCols:[]
    },
    actions:{
        async GET_JOBS_FROM_API({commit}){
            try{
                const jobs = await axios('http://localhost:3200/jobs',{
                    method: "GET"
                })
                commit('SET_JOBS_TO_STATE', jobs.data)
                return jobs
            }catch(error){
                console.error(error)
                return error
            }
        },
        async GET_JOB_COLS_FROM_API({commit}){
            try{
                const jobCols = await axios('http://localhost:3200/jobcols',{
                    method: "GET"
                })
                commit('SET_JOB_COLS_TO_STATE',jobCols.data)
                return jobCols
            }catch(error){
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