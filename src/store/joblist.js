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
        },
        REARRANGE_JOBLIST_IN_STATE: (state) => {
            if(state.jobList.length>0){
                for(let i=0;i<state.jobList.length-1;i++){
                    state.jobList[i].id = i+1
                }
            }
        }
    },
    actions:{
        async DEL_JOBLIST_FROM_API({commit,state},rowId){
            try{
                const delJob = await axios('http://localhost:3200/joblist/'+rowId,{
                    method: "DELETE"
                })
                this.dispatch('GET_JOBLIST_FROM_API')
                commit('REARRANGE_JOBLIST_IN_STATE')
                let deleting
                console.log('deleting')
                for(let i=rowId+1;i<=state.jobList.length;i++){
                    deleting=await axios('http://localhost:3200/joblist/'+i,{method:"DELETE"})
                    console.log(deleting)
                }
                this.dispatch('PUT_REARRANGED_JOBLIST_IN_API', rowId)
                return delJob
            }catch(error){
                console.error(error)
                return error
            }
        },
        async PUT_REARRANGED_JOBLIST_IN_API({state},rowId){
            try{
                let postJoblist
                console.log('posting back')
                for(let i=rowId;i<=state.jobList.length;i++){
                    postJoblist=await axios.post('http://localhost:3200/joblist',state.jobList[i+1])
                }
                return postJoblist
            }catch(error){
                console.error(error)
                return error
            }
        },
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