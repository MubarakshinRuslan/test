<template>
    <a-select 
    show-search
    default-value=""
    v-model="name"
    @select="syncWithState"
    >
      <div slot="dropdownRender" slot-scope="menu">
        <v-nodes :vnodes="menu" />
        <a-divider style="margin: 4px 0;" />
        <div
          style="padding: 4px 8px; cursor: pointer;"
          @mousedown="e => e.preventDefault()"
          @click="addItem"
        >
          <a-icon type="plus" /> Добавить сотрудника
        </div>
      </div>
      <a-select-option v-for="i in this.$store.getters.JOB_LIST" :key="i.name">
        {{ i.name }}
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
    data: () => ({ name: '' }),
    methods: {
      async syncWithState(){
        try {
          const sws = await this.$store.dispatch('SET_TASKPICKER_NAME',this.name)
          console.log(sws)
        } catch (error) {
          console.log(error)
        }
      },
      async addItem() {
        console.log('addItem');
        const user = {
          name:`Новый сотрудник ${this.$store.getters.GET_TASKCOUNTER}`
        }
        try{
          const ac = await this.$store.dispatch('ADD_TASKCOUNTER')
          console.log(ac)
          const anu = await this.$store.dispatch('ADD_NEWUSER',user)
          console.log(anu)
          message.success('Добавлен новый сотрудник!',5)
        }catch(e){
          message.error('Не удалось добавить сотрудника',5)
          console.error(e)
          
        }        
      },
    },
  };
  </script>
  