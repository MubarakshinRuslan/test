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
             :row-selection="{selectedRowKeys:selectedRowKeys, onChange: onSelectChange}"
            >
            </a-table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import AppNewUserDrawer from '@/components/NewUserDrawer.vue'
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
            deleteUser(){
                if(this.selectedRowKeys.length>0){
                    for(let i = 0; i<this.selectedRowKeys.length;i++){
                        const delRow = this.selectedRowKeys[i]
                        this.$store.dispatch('DEL_JOBLIST_FROM_API', delRow)
                    }
                }else{alert('Не выбрано ни одного пользователя')}
            },
            onSelectChange(selectedRowKeys){
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            }
        }
    }
</script>