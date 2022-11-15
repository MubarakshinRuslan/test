import axios from 'axios'
import {message} from 'ant-design-vue'

export default{
    state:{
        jobList: [],
        jobListCols: [],
        userUrl: 'http://localhost:3200/joblist',
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
        async ADD_NEWUSER({state},user){
            try{
                const j = await axios.post(state.userUrl,user)
                console.log(j)
                const nd = await this.$store.dispatch('addDependenceToApi',user.name, user.job)
                console.log(nd)
                message.success('Новый пользователь добавлен!',5)
                const g = await this.dispatch('GET_JOBLIST_FROM_API')
                console.log(g)
            }catch(e){
                message.error('Ошибка при добавлении нового пользователя!',5)
            }
        },
        async DELETE_JOBLIST_FROM_API({state},rowId){
            this.dispatch('GET_JOBLIST_FROM_API')//загрузка массива JOBLIST из сервера в STORE
            rowId.forEach(async (element)=>{try{
                let var1=state.jobList.at(element).job
                let var2=state.jobList.at(element).name
                const md = await this.$store.dispatch('matchDependencies',var1)
                console.log(md)
                if(!(this.$store.getters.getIsDependent)){
                    const jj = await this.$store.dispatch('delDependenceFromApi',var1, var2)
                    console.log(jj)
                    const j = await axios.delete(state.userUrl+'/'+element)//удаление записи
                    console.log(j)
                    message.success(`Запись удалена`,5)
                }else{
                    throw 'dependent'
                }
            }catch(e){
                if(e === 'dependent'){
                    message.error('Нельзя удалить, так как используется в задаче!',10)
                }
                console.error(e)
                message.error('Ошибка при удалении из базы!',5)
            }
            this.dispatch('GET_JOBLIST_FROM_API')
        })},
        async GET_JOBLIST_FROM_API({commit}){
            try{
                const jobList = await axios('http://localhost:3200/joblist',{
                    method: "GET"
                })
                message.success('Данные таблицы пользователей загружены!')
                commit('SET_JOBLIST_TO_STATE',jobList.data)
                return jobList
            }catch(error){
                message.error('Ошибка! Данные таблицы пользователей не загружены!')
                console.error(error)
                return error
            }
        },
        async GET_JOBLISTCOLS_FROM_API({commit}){
            try{
                const jobListCols = await axios('http://localhost:3200/joblistcols',{
                    method: "GET"
                })
                message.success('Таблица пользователей загружена!')
                commit('SET_JOBLISTCOLS_TO_STATE',jobListCols.data)
                return jobListCols
            }catch(error){
                message.error('Ошибка! Таблица пользователей не загружена!')
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
        },
        JOBLIST_JOB({state}, id){
            return state.jobList.at(id).job
        },
        JOBLIST_NAME({state},id){
            return state.jobList.at(id).name
        }
    }
}