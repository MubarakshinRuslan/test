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
            row-key="id"
            :data-source="this.$store.getters.JOBS"
            :columns="this.$store.getters.JOB_COLS"
            :row-selection="{onChange: onSelectChange}"
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
            
        },
        methods:{
            onSelectChange(){
            }
        }
    }
</script>