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
                <a-button @click="completeTask">Сделать отмеченные задачи выполненными</a-button>
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
                <span slot="tags" slot-scope="tags">
                    <a-space size="small">
                        <a-tag
                        v-for="tag in tags"
                        :key="tag"
                        :color="tag==='Просрочено' ? 'volcano' : 'green'"
                        >
                            {{tag.toUpperCase()}}
                        </a-tag>
                    </a-space>
                </span>
            </a-table>
        </div>
    </div>
</template>
<script>
import AppNewTaskDrawer from '@/components/NewTaskDrawer.vue'
import Vue from 'vue'
import {message} from 'ant-design-vue'

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
            async completeTask(){
                if(this.selectedRowKeys.length>0){
                    await this.$store.dispatch('MAKE_TASKS_COMPLETED',this.selectedRowKeys)
                    this.selectedRowKeys=[]
                }else{message.error('Не выбрано ни одной задачи!',5)}
            },
            async deleteTask(){
                if(this.selectedRowKeys.length>0){
                    await this.$store.dispatch('DELETE_TASKS_FROM_API',this.selectedRowKeys)
                    this.selectedRowKeys=[]
                }else{message.error('Не выбрано ни одной задачи!',5)}
            },
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys=selectedRowKeys
            }
        },
        mounted() {
        }
    }

</script>