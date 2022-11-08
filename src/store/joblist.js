import axios from 'axios'

export default{
    state:{
        jobList: [],
        jobListCols: []
    },
    mutations:{
        SET_JOBLIST_TO_STATE: (state, jobList) => {
            state.jobList = jobList
        },
        SET_JOBLISTCOLS_TO_STATE: (state, jobListCols) => {
            state.jobListCols = jobListCols
        }
    },
    actions:{
        async GET_JOBLIST_FROM_API({commit}){
            try{
                const jobList = await axios('http://localhost:3200/joblist',{
                    method: "GET"
                })
                commit('SET_JOBLIST_TO_STATE',jobList.data)
                return jobList
            }catch(error){
                console.error(error)
                return error
            }
        },
        async GET_JOBLISTCOLS_FROM_API({commit}){
            try{
                const jobListCols = await axios('http://localhost:3200/joblistcols',{
                    method: "GET"
                })
                commit('SET_JOBLISTCOLS_TO_STATE',jobListCols.data)
                return jobListCols
            }catch(error){
                console.error(error)
                return error
            }
        }
    },
    getters:{
        JOB_LIST(state){
            return state.jobList
        },
        JOB_LIST_COLS(state){
            return state.jobListCols
        }
    }
}