<template>
    <div>
        <a-divider />
        <h1>
            Редактор задач
        </h1>
        <a-divider/>
        <div>
            <app-new-task-drawer></app-new-task-drawer>
        </div>
        <a-divider/>
        <div>
            <a-table
            bordered
            :data-source="this.$store.getters.TASKS"
            :columns="this.$store.getters.TASK_COLS"
            >

            </a-table>
        </div>
    </div>
</template>
<script>
//import store from '@/store'
import AppNewTaskDrawer from '@/components/NewTaskDrawer.vue'
import Vue from 'vue'
//import {mapActions, mapGetters} from 'vuex'
Vue.component('app-new-task-drawer', AppNewTaskDrawer)
    export default{
        created(){
            this.$store.dispatch('GET_TASKS_FROM_API')
            this.$store.dispatch('GET_TASK_COLUMNS_FROM_API')
        },
        data(){
            return{
                //store,
                //cols: [],
                //datab: []
            }
        },
        /*computed:{
            ...mapGetters([
               'TASKS', 'TASK_COLS'
            ])
        },*/
        /*methods:{
            ...mapActions([
                'GET_TASKS_FROM_API', 
                'GET_TASK_COLUMNS_FROM_API'
            ])
        },*/
        mounted() {
            
            console.log(this.$store.state.tasks)
            console.log(this.$store.state)
        }
    }
</script>