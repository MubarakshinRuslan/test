<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo" />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <a-button @click="enableTaskEdit=!enableTaskEdit">
          <span v-if="enableTaskEdit">Перейти в редактор пользователей</span>
          <span v-else>Перейти в редактор задач</span>
        </a-button>
        <div v-if="enableTaskEdit">
          <app-task-manager></app-task-manager>
        </div>
        <div v-else>
          <app-user-manager></app-user-manager>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script>
import TaskManager from './TaskManager.vue'
import UserManager from './UserManager.vue'
  export default{
  components: { 
    appTaskManager: TaskManager,
    appUserManager: UserManager
  },
    data(){
      return{
        enableTaskEdit: 'true',
      }
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