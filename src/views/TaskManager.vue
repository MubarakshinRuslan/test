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
            :data-source="tasks"
            :columns="columns"
            >

            </a-table>
        </div>
    </div>
</template>
<script>
import AppNewTaskDrawer from '@/components/NewTaskDrawer.vue'
import Vue from 'vue'
import TasksDB from '@/data/taskList.json'
Vue.component('app-new-task-drawer', AppNewTaskDrawer)
    export default{
        // computed:{
        //     startedTasks () {
        //         return this.$store.getters.startedTasks
        //     },
        //     tasks () {
        //         return this.$store.getters.tasks
        //     }
        // },
        data(){
            return{
                columns: [
                    {
                        title: '#',
                        dataIndex: "key"
                    },
                    {
                        title: 'Название',
                        dataIndex: "name"
                    },
                    {
                        title: 'Дата начала',
                        dataIndex: 'startDate'
                    },
                    {
                        title: 'Дата окончания',
                        dataIndex: 'endDate'
                    },
                    {
                        title: 'Исполнитель',
                        dataIndex: 'user'
                    },
                    {
                        title: 'Идентификатор задачи',
                        dataIndex: "id"
                    }
                ],
                tasks: TasksDB
            }
        }

    }
</script>