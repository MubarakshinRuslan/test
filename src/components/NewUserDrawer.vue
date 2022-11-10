<template>
    <div>
      <a-button type="primary" @click="showDrawer"> <a-icon type="plus" /> Добавить пользователя </a-button>
      <a-drawer
        title="Добавить пользователя"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form :form="form" layout="vertical" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="Фамилия">
                <a-input
                  placeholder="Введите фамилию"
                  v-model="lastName"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Имя">
                    <a-input
                        v-model="firstName"
                        placeholder="Введите имя"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Отчество">
                    <a-input
                        v-model="patronym"
                        placeholder="Введите отчество"
                    />
                </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Выберите должность">
                <a-select
                  v-model="job"
                  placeholder="Выберите должность"
                >
                  <a-select-option v-for="i in this.$store.getters.JOBS" :key="i.job">
                    {{i.job}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Дополнительные заметки">
                <a-textarea
                  :rows="4"
                  placeholder="Поле для дополнительных заметок"
                  v-model="description"
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
            Добавить сотрудника
          </a-button>
        </div>
      </a-drawer>
    </div>
  </template>
  <script>
  //import axios from 'axios'
  export default {
    data() {
      return {
        name:'',
        firstName:'',
        lastName:'',
        patronym:'',
        job:'',
        description:'',
        form: this.$form.createForm(this),
        visible: false,
      };
    },
    methods: {
      showDrawer() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
      onSubmit(){
        let newname = this.lastName+' '+this.firstName[0]+'. '+this.patronym[0]+'.'
        const newUser = {
          firstName:this.firstName,
          lastName:this.lastName,
          patronym:this.patronym,
          job:this.job,
          description:this.description,
          name:newname
        }
        this.$store.dispatch('ADD_NEWUSER',newUser)
        this.visible = false
        // axios.post('http://localhost:3200/jobList',newUser)
        // .then(res=>{
        //   console.log(res)
        //   this.visible = false
        //   this.$store.dispatch('GET_JOBLIST_FROM_API')
        //   this.$store.dispatch('GET_JOBLISTCOLS_FROM_API')
        // })
      }
    },
  };
  </script>
  