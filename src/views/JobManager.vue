<template>
    <div>
        <a-divider/>
        <h1>Список должностей</h1>
        <a-divider/>
        <div>
            <app-new-job-drawer/>
        </div>
        <a-divider/>
        <div> 
            <a-table
            bordered
            :data-source="this.$store.getters.JOBS"
            :columns="this.$store.getters.JOB_COLS"
            >                
            </a-table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import AppNewJobDrawer from '@/components/NewJobDrawer.vue'
Vue.component('app-new-job-drawer', AppNewJobDrawer)
    export default{
        created(){
            this.$store.dispatch('GET_JOBS_FROM_API')
            this.$store.dispatch('GET_JOB_COLS_FROM_API')
        }
    }
</script>