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
                <a-button>Удалить пользователя</a-button>
            </a-space> 
        </div>
        <a-divider />
        <div>
            Таблица
            <a-table
             bordered 
             :data-source="this.$store.getters.JOB_LIST" 
             :columns="this.$store.getters.JOB_LIST_COLS"
             :row-selection="{onChange: onSelectChange}"
            >
            </a-table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import AppNewUserDrawer from '@/components/NewUserDrawer.vue'
Vue.component('app-new-user-drawer', AppNewUserDrawer)
export default{
        created(){
            this.$store.dispatch('GET_JOBLIST_FROM_API')
            this.$store.dispatch('GET_JOBLISTCOLS_FROM_API')
        },
        data(){
            return{
                //dataSource: jobList
            }
        },
        computed:{
            hasSelected(){
                return this.selectedRowKeys.length>0;
            },
        },
        methods: {
            onSelectChange(){
            }
        }
    }
</script>