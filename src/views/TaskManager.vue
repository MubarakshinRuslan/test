<template>
    <div>
        <a-divider />
        <h1>
            Редактор задач
        </h1>
        <a-divider/>
        <div>
            <a-space size="small">
                <app-new-task-drawer/>
                <a-button @click="deleteTask">Удалить задачу</a-button>
            </a-space>
        </div>
        <a-divider/>
        <div>
            <a-table
            bordered
            row-key="id"
            :data-source="this.$store.getters.TASKS"
            :columns="this.$store.getters.TASK_COLS"
            :row-selection="{selectedRowKeys:selectedRowKeys, onChange: onSelectChange}"
            >

            </a-table>
        </div>
    </div>
</template>
<script>
import AppNewTaskDrawer from '@/components/NewTaskDrawer.vue'
import Vue from 'vue'
import {message} from 'ant-design-vue'
//import axios from 'axios'
Vue.component('app-new-task-drawer', AppNewTaskDrawer)
    export default{
        created(){
            
        },
        data(){
            return{
                selectedRowKeys:[]
            }
        },
        computed:{
            hasSelected(){
                return this.selectedRowKeys.length>0;
            },
        },
        methods:{
            deleteTask(){
                if(this.selectedRowKeys.length>0){
                    this.$store.dispatch('DELETE_TASKS_FROM_API',this.selectedRowKeys)
                    this.selectedRowKeys=[]
                }else{message.error('Не выбрано ни одной задачи!',5)}
            },
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys=selectedRowKeys
            }
        },
        mounted() {
            
            console.log(this.$store.state.tasks)
            console.log(this.$store.state)
        }
    }
</script>