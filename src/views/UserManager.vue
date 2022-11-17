<template>
    <div>
        <a-divider />
        <div>
            <h1>Редактор пользователей</h1>
        </div>
        <a-divider />
        <div>
            <a-space size="small"> 
                <app-new-user-drawer 
                ref="userDrawer"
                />
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
                <template slot="actions" slot-scope="text,record">
                        <a @click="() => onEdit(record.id)">Изменить</a>
                        <a-divider type="vertical"/>
                        <a @click="() => deleteSingle(record.id)">Удалить</a>
                </template>
            </a-table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import AppNewUserDrawer from '@/components/NewUserDrawer.vue'
import {message} from 'ant-design-vue'
Vue.component('app-new-user-drawer', AppNewUserDrawer)
export default{
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
        methods: {
            onEdit(key){
                this.$refs.userDrawer.showDrawerEdit(key)
            },
            async deleteSingle(key){
                const keys = []
                keys.push(key)
                await this.$store.dispatch('DELETE_JOBLIST_FROM_API',keys)
            },
            async deleteUser(){
                if(this.selectedRowKeys.length>0){
                    await this.$store.dispatch('DELETE_JOBLIST_FROM_API',this.selectedRowKeys)
                    this.selectedRowKeys=[]
                }else{message.error('Не выбрано ни одного пользователя',5)}
            },
            onSelectChange(selectedRowKeys){
                console.log('selectedRowKeys changed: ', selectedRowKeys)
                this.selectedRowKeys = selectedRowKeys
            }
        }
    }
</script>