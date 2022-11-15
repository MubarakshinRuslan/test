import axios from "axios"

export default{
    state:{
        dependencies:[],
        index:-1,
        isDependent: false
    },
    mutations:{
        addDependenceToState: (state, master, slave) => {
            let newDependence = {
                master,
                slave
            }
            state.dependencies.push(newDependence)
        },
        delDependenceFromState: (state, master, slave) => {
            state.dependencies.forEach(element => {
                if(element.includes({
                    master,
                    slave
                })){
                    let z = state.dependencies.indexOf({master,slave})
                    state.dependencies.splice(z,1)
                    state.index=z                   
                }
            })
        },
        setDependenciesToState: (state, dependencies) => {
            state.dependencies = dependencies
        },
        indexToDefaultValue: (state) => {
            state.index = -1
        },
        matchDependenciesInState: (state, var1) => {
            let j = state.dependencies.find(({slave})=>slave === var1)
            if(j.slave===var1){
                state.isDependent = true
            }
        },
        isDependentToDefault: (state) => {
            state.isDependent = false
        }
    },
    actions:{
        async addDependenceToApi({commit},master, slave){
            commit('addDependenceToState', master, slave)
            try{
                const newDependence = {
                    master,
                    slave
                }
                const act = await axios.post('http://localhost:3200/dependencies',newDependence)
                console.log(act)
                return act
            }catch(e){
                console.error(e)
            }
        },
        async matchDependencies({commit},var1){
            commit('isDependentToDefault')
            const gd = await this.dispatch('getDependenciesFromApi')
            console.log(gd)
            commit('matchDependenciesInState',var1)
            return 'matchDependencies: done'
        },
        async getDependenciesFromApi({commit}){
            try{
                const jobs = await axios('http://localhost:3200/jobs',{
                    method: "GET"
                })
                commit('setDependenciesToState', jobs.data)
                return jobs
            }catch(error){
                console.error(error)
                return error
            }
        },
        async delDependenceFromApi({state,commit}){
            commit('delDependenceFromState')
            try{
                const act = await axios.delete('http://localhost:3200/dependencies/'+state.index)
                commit('indexToDefaultValue')
                console.log(act)
            }catch(e){
                console.error(e)
            }
        }
    },
    getters:{
        getDependencies(state){
            return state.dependencies
        },
        getIsDependent(state){
            return state.isDependent
        }
    }
}