
<template>
    <div>
        <a-divider/>
        <h1>Список должностей</h1>
        <a-divider/>
        <div>
            <a-space size="small">
                <app-new-job-drawer ref="jobDrawer"/>
                <!-- <a-button @click="deleteJob">Удалить должность</a-button> -->
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
                <template slot="actions" slot-scope="text,record">
                    <a @click="() => onEdit(record.id)">Изменить</a>
                    <a-divider type="vertical"/>
                    <a @click="() => deleteSingle(record)">Удалить</a>
                </template>      
            </a-table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import AppNewJobDrawer from '@/components/NewJobDrawer.vue'
import {message} from 'ant-design-vue'
//import dependencies from '@/store/dependencies'
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
            async deleteSingle(jobObject){
                const jobList = [...this.$store.getters.JOB_LIST]
                //console.log(jobList)
                const filtered = jobList.filter(item => {
                    return item.job === jobObject.job
                })
                //console.log(filtered)
                if (filtered.length) {
                    // нельзя удалять
                    message.error('Невозможно удалить должность, так как она привязана к пользователю!',5)
                } else {
                    const keys = []
                    keys.push(jobObject.id)
                    await this.$store.dispatch('DELETE_JOB_FROM_API',keys)
                }                
            },
            onEdit(jobObject){
                const jobList = [...this.$store.getters.JOB_LIST]
                const filtered = jobList.filter(item => {
                    return item.job === jobObject.job
                })
                if (filtered.length) {
                    message.error('Невозможно изменить должность, так как она привязана к пользователю!',5)
                } else {
                    this.$refs.jobDrawer.showDrawerEdit(jobObject.id)
                }
            },
            async deleteJob(){
                if(this.selectedRowKeys.length>0){
                    await this.$store.dispatch('DELETE_JOB_FROM_API',this.selectedRowKeys)
                    this.selectedRowKeys=[]
                }else{message.error('Не выбрано ни одной должности которую можно удалить',5)}
            },
            onSelectChange(selectedRowKeys){
                this.selectedRowKeys = selectedRowKeys;
                this.$store.dispatch('SET_SELJOBLISTROWS',selectedRowKeys)
            }
        }
    }
</script>
