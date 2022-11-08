import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './tasks' 
import jobs from './jobs'
import joblist from './joblist'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    tasks, jobs, joblist
  }
})
