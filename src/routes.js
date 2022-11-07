import VueRouter from "vue-router"
import TaskManager from '@/views/TaskManager'
import UserManager from '@/views/UserManager.vue'
import JobManager from '@/views/JobManager.vue'

export default new VueRouter ({
    routes:[
        {
            path:'/',
            component: TaskManager,
        },
        {
            path: '/users',
            component: UserManager
        },
        {
            path: '/jobs',
            component: JobManager
        }
    ],
    mode: 'history'
})