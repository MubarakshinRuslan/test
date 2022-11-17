
<template>
  <div>
    <a-button type="primary" @click="showDrawer"> <a-icon type="plus" /> Добавить пользователя </a-button>
    <a-drawer
    :title="drawerTitle"
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
            <app-user-picker/>
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
          {{submitButtonText}}
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>
  
<script>
  import AppUserPicker from '@/components/UserPicker.vue'
  import Vue from 'vue'
  Vue.component('app-user-picker',AppUserPicker)
  
  export default {
    data() {
      return {
        forEditKey:0,
        submitButtonText: 'Сохранить',
        drawerIsEditor: false,
        drawerTitle:'Добавить пользователя',
        name:'',
        firstName:'',
        lastName:'',
        patronym:'',
        description:'',
        form: this.$form.createForm(this),
        visible: false,
        isVisible: false,
        user: undefined,
      }
    },
    methods: {
      showDrawer() {
        this.drawerIsEditor = false
        this.visible = true
        this.drawerTitle = 'Добавить пользователя'
        this.submitButtonText = 'Добавить пользователя'
        
        this.firstName = ''
        this.lastName = ''
        this.patronym = ''
        this.description = ''

      },
      showDrawerEdit(key){
        this.forEditKey = key
        this.drawerIsEditor = true
        this.visible = true
        this.drawerTitle = 'Редактировать пользователя'
        this.submitButtonText = 'Изменить пользователя'
        const data = [...this.$store.getters.JOB_LIST]
        let id = data.findIndex(element => element.id === key)
        this.firstName = data.at(id).firstName
        this.lastName = data.at(id).lastName
        this.patronym = data.at(id).patronym
        this.description = data.at(id).description

      },
      openDrawer() {
        this.isVisible = !this.isVisible
      },
      onClose() {
        this.visible = false
        this.firstName = ''
        this.lastName = ''
        this.patronym = ''
        this.description = ''
      },
      async onSubmit(){
        let newname = this.lastName+' '+this.firstName[0]+'. '+this.patronym[0]+'.'
        let newUser = {
          firstName:this.firstName,
          lastName:this.lastName,
          patronym:this.patronym,
          job:this.$store.getters.NEW_JOB,
          description:this.description,
          name:newname
        }
        this.visible = false
        if(this.drawerIsEditor){
          try{
            newUser.id=this.forEditKey
            await this.$store.dispatch('EDIT_USER_IN_API',newUser)
          }catch(e){console.error(e)}
          console.log(newUser)
          console.log('пользователь изменен')
        }else{
          try{
            await this.$store.dispatch('ADD_NEWUSER',newUser)
          }catch(e){console.error(e)}
          console.log(newUser)
          console.log('пользователь создан')
        }
      }
    },
  }
</script>
  