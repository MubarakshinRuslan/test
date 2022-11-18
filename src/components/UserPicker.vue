<template>
    <a-select 
    show-search
    :default-value="defaultUserTask" 
    v-model="job" 
    @select="syncWithState">
        <div slot="dropdownRender" slot-scope="menu">
            <v-nodes :vnodes="menu" />
            <a-divider style="margin: 4px 0;" />
            <div
            style="padding: 4px 8px; cursor: pointer;"
            @mousedown="e => e.preventDefault()"
            @click="addItem"
            >
                <a-icon type="plus" /> Добавить должность
            </div>
        </div>
        <a-select-option v-for="i in this.$store.getters.JOBS" :key="i.job">
            {{ i.job }}
        </a-select-option>
    </a-select>
</template>
<script>
    import {message} from 'ant-design-vue'
    export default {
        components: {
            VNodes: {
                functional: true,
                render: (h, ctx) => ctx.props.vnodes,
            },
        },
        data(){ 
            return{
                job: '',
                defaultUserTask:''
            }
        },
        methods: {
            changeUserValue(value){
                this.defaultUserTask=value
            },
            async syncWithState(){
                try {
                    const sws = await this.$store.dispatch('SET_USERPICKER_NAME',this.job)
                    console.log(sws)
                } catch (error) {
                    console.log(error)
                }
            },
            async addItem() {
                console.log('addItem');
                const job = {
                    job:`Новая должность ${this.$store.getters.GET_NEWJOBCOUNTER}`
                }
                try{
                    const ac = await this.$store.dispatch('ADD_JOBCOUNTER')
                    console.log(ac)
                    const anu = await this.$store.dispatch('ADD_NEWJOB',job)
                    console.log(anu)
                    message.success('Добавлена новая должность!',5)
                }catch(e){
                    message.error('Не удалось добавить новую должность!',5)
                    console.error(e)
                }
            },
        },
    };
</script>
  