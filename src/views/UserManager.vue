<template>
    <div>
        <a-divider />
        <div>
            <h1>Редактор пользователей</h1>
        </div>
        <a-divider />
        <div>
            <a-space size="small"> 
                <app-new-user-drawer/>
                <a-button >Изменить пользователя</a-button>
                <a-button @click="deleteUser">Удалить пользователя</a-button>
            </a-space> 
        </div>
        <a-divider />
        <div>
            Таблица
            <a-table
             bordered 
             :data-source="this.$store.getters.JOB_LIST" 
             :columns="this.$store.getters.JOB_LIST_COLS"
             row-key="id"
             :row-selection="{selectedRowKeys:selectedRowKeys, onChange: onSelectChange}"
            >
            </a-table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import AppNewUserDrawer from '@/components/NewUserDrawer.vue'
import {message} from 'ant-design-vue'
//import axios from 'axios'
Vue.component('app-new-user-drawer', AppNewUserDrawer)
export default{
        created(){
            
        },
        data(){
            return{
                //dataSource: jobList
                selectedRowKeys:[]
            }
        },
        computed:{
            hasSelected(){
                return this.selectedRowKeys.length>0;
            },
        },
        methods: {
            async deleteUser(){
                if(this.selectedRowKeys.length>0){
                    await this.$store.dispatch('DELETE_JOBLIST_FROM_API',this.selectedRowKeys)
                    this.selectedRowKeys=[]
                }else{message.error('Не выбрано ни одного пользователя',5)}
            },
            onSelectChange(selectedRowKeys){
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            }
        }
    }
</script>