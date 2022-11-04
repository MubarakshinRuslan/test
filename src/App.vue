<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo" />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div>
        <a-tabs default-active-key="3" @change="callback">
          <a-tab-pane key="1" tab="Пользователи">
            <app-user-manager />
          </a-tab-pane>
          <a-tab-pane key="2" tab="Должности" force-render>
            <app-job-manager />
          </a-tab-pane>
          <a-tab-pane key="3" tab="Задачи">
            <app-task-manager />
          </a-tab-pane>
        </a-tabs>
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
import JobManager from './JobManager.vue'
export default {
  methods: {
    callback(key) {
      console.log(key);
    },
  },
  components: {
    appTaskManager: TaskManager,
    appUserManager: UserManager,
    appJobManager: JobManager
  },
  data() {
    return {
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