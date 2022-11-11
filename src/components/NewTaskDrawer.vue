<template>
    <div>
      <a-button type="primary" @click="showDrawer"> <a-icon type="plus" /> Создать новую задачу </a-button>
      <a-drawer
        title="Создать новую задачу"
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
                <a-select
                  v-model="user"
                  placeholder="Выберите исполнителя"
                >
                  <a-select-option v-for="i in this.$store.getters.JOB_LIST" :key="i.name">
                    {{i.name}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Даты начала и окончания">
                <!-- :default-value="dates" -->
                <a-range-picker                
                :format="dateFormat"
                v-model="dates"
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
            Создать
          </a-button>
        </div>
      </a-drawer>
    </div>
  </template>
  <script>
  //import axios from 'axios'
  import moment from 'moment'
  export default {
    data() {
      return {
        dateFormat: 'YYYY/MM/DD',
        dates: [moment('2022/01/01', 'YYYY/MM/DD'), moment('2023/01/01', 'YYYY/MM/DD')],
        form: this.$form.createForm(this),
        visible: false,
        startDate: "",
        endDate:"",
        name:"",
        user:"",
        description:""
      };
    },
    methods: {
        moment,
      showDrawer() {
        this.visible = true;
        this.name='';
        this.user='';
        this.description='';
      },
      onClose() {
        this.visible = false;
      },
      onSubmit() {
        const newTask={
          key:this.$store.getters.TASKS.length+1,
          name: this.name,
          user: this.user,
          description: this.description,
          startDate: this.dates[0]._i,
          endDate: this.dates[1]._i
        }
        this.$store.dispatch('ADD_NEWTASK',newTask)
        this.visible = false
      }
    },
  };
  </script>
  