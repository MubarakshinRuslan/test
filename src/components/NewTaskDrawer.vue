<template>
    <div>
      <a-button type="primary" @click="showDrawer"> <a-icon type="plus" /> Создать новую задачу </a-button>
      <a-drawer
        :title="drawerTitle"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :form="form" layout="vertical" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Название">
                <a-input
                  v-model="name"
                  placeholder="Введите название задачи"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Исполнитель">
                <app-task-picker ref="taskPicker"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Даты начала и окончания">
                <a-range-picker
                separator	= "-"
                @change="changeDate"                
                :format="dateFormat"
                :defaultValue="defaultValueDatePicker"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Описание">
                <a-textarea
                  v-model="description"
                  :rows="4"
                  placeholder="Введите описание задачи"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button :style="{ marginRight: '8px' }" @click="onClose">
            Отменить
          </a-button>
          <a-button type="primary" @click="onSubmit">
            {{this.submitButtonText}}
          </a-button>
        </div>
      </a-drawer>
    </div>
  </template>
  <script>
  //import axios from 'axios'
  import Vue from 'vue'
  import AppTaskPicker from '@/components/TaskPicker.vue'
  import moment from 'moment'
  Vue.component('app-task-picker',AppTaskPicker)
  export default {
    data() {
      return {
        defaultValueDatePicker: [moment(),moment()],
        submitButtonText:'',
        drawerTitle:'',
        forEditKey:0,
        dateFormat: 'YYYY/MM/DD',
        dates: [],
        form: this.$form.createForm(this),
        visible: false,
        startDate: "",
        endDate:"",
        name:"",
        user:"",
        description:"",
        drawerIsEditor: "false"
      };
    },
    methods: {
        moment,
      changeDate(date, dateString) {
        this.startDate=dateString[0]
        this.endDate=dateString[1]
      },
      showDrawer() {
        //const newSet=""
        //this.$refs.taskPicker.changeTaskValue(newSet)
        this.drawerIsEditor = false
        this.drawerTitle = 'Создать задачу'
        this.submitButtonText='Создать задачу'

        this.visible = true;
        this.name='';
        this.user='';
        this.description='';
      },
      showDrawerEdit(key){
        this.forEditKey = key
        this.drawerIsEditor = true
        this.visible = true
        this.drawerTitle = 'Редактирование задачи'
        this.submitButtonText = 'Изменить задачу'
        const data = [...this.$store.getters.TASKS]
        console.log(data)
        let id = data.findIndex(element => element.id === key)
        this.description = data.at(id).description
        this.startDate = data.at(id).startDate
        this.endDate = data.at(id).endDate
        this.name = data.at(id).name
        //this.user = data.at(id).user
        //this.$refs.taskPicker.changeTaskValue(this.user)
        let start = this.startDate.split("/").join("-")
        let end = this.endDate.split('/').join('-')
        console.log(start)
        console.log(end)
        this.defaultValueDatePicker=[moment(start),moment(end)]

      },
      onClose() {
        this.visible = false;
      },
      async onSubmit() {
        let newTask={
          name: this.name,
          user: this.$store.getters.GET_TASKPICKERNAME,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
          tags: [],
        }
        if(this.drawerIsEditor){
          try {
            newTask.id=this.forEditKey
            const et = await this.$store.dispatch('EDIT_TASK',newTask)
            console.log(et)
          } catch (error) {
            console.error(error)
          }
        }else{
          try {
            const nt = await this.$store.dispatch('ADD_NEWTASK',newTask)
            console.log(nt)
          }catch(e){console.log(e)}
        }
        this.visible = false
      }
    },
  };
  </script>
  