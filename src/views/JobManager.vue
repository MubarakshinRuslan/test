
<template>
    <div>
        <a-divider/>
        <h1>Список должностей</h1>
        <a-divider/>
        <div>
            <a-space size="small">
                <app-new-job-drawer :item="{}"/>
                <a-button @click="deleteJob">Удалить должность</a-button>
            </a-space>
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
import {message} from 'ant-design-vue'
Vue.component('app-new-job-drawer',AppNewJobDrawer)
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
            }
        },
        methods:{
            async deleteJob(){
                if(this.selectedRowKeys.length>0){
                    await this.$store.dispatch('DELETE_JOB_FROM_API',this.selectedRowKeys)
                    this.selectedRowKeys=[]
                }else{message.error('Не выбрано ни одной должности',5)}
            },
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys = selectedRowKeys;
                this.$store.dispatch('SET_SELJOBLISTROWS',selectedRowKeys)
            }
        }
    }
</script>
