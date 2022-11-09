<template>
    <a-layout-header class="header">
        <div>
            <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="n"
            :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="1">
                    <router-link to="/"><a-icon type="check-circle"/>Задачи</router-link>
                </a-menu-item>
                <a-menu-item key="2">
                    <router-link to="/jobs"><a-icon type="solution"/>Должности</router-link>
                </a-menu-item>
                <a-menu-item key="3">
                    <router-link to="/users"><a-icon type="team"/>Пользователи</router-link>
                </a-menu-item>
            </a-menu>
        </div>
    </a-layout-header>
</template>

<script>

export default{
    data(){
        return{
            n: ['1']
        }
    }
}
</script>
