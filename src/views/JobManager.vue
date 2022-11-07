<template>
    <div>
        <a-divider/>
        <h1>Редактор должностей</h1>
        <a-divider/>
        <div>
            <app-new-job-drawer/>
        </div>
        <a-divider/>
        <div> 
            <a-table>
                
            </a-table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import AppNewJobDrawer from '@/components/NewJobDrawer.vue'
Vue.component('app-new-job-drawer', AppNewJobDrawer)
    export default{
        
    }
</script>