<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <app-header-bar></app-header-bar>
    <a-layout-content style="padding: 0 50px">
      <div>
        <router-view/>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import Vue from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
Vue.component('app-header-bar', HeaderBar)
  export default{
    created(){
      this.$store.dispatch('GET_TASKS_FROM_API')
      this.$store.dispatch('GET_TASK_COLUMNS_FROM_API')
      this.$store.dispatch('GET_JOBS_FROM_API')
      this.$store.dispatch('GET_JOB_COLS_FROM_API')
      this.$store.dispatch('GET_JOBLIST_FROM_API')
      this.$store.dispatch('GET_JOBLISTCOLS_FROM_API')
    },
    data(){
      {
        HeaderBar
      }
      return{
        enableTaskEdit: 'true',
      }
    },
    methods:{
      callback(key){
        console.log(key);
      },
    }      
  }
</script>
<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>