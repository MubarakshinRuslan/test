<template>
    <div>
      <a-button type="primary" @click="showDrawer"> <a-icon type="plus" /> Добавить должность </a-button>
      <a-drawer
        title="Добавить должность"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form layout="vertical" hide-required-mark>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-model 
              ref="user"
              >
                <a-form-model-item 
                has-feedback 
                label="Должность" 
                prop="job"
                >
                  <a-input 
                  v-model="job" 
                  type="text" 
                  autocomplete="off" 
                  />
                </a-form-model-item>
                <a-form-model-item 
                has-feedback 
                label="Описание" 
                prop="notes"
                >
                  <a-input 
                  v-model="notes" 
                  />
                </a-form-model-item>
              </a-form-model>
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
          <a-button type="primary" html-type="submit" @click="onSubmit" :disabled="this.job === ''">
            Добавить должность
          </a-button>
        </div>
      </a-drawer>
    </div>
  </template>
  
<script>
  export default {
    methods: {
      showDrawer() {
        this.visible = true;
        this.job=''
        this.notes='';
      },
      onClose() {
        this.visible = false;
      },
      async onSubmit(){
        const user = {
          job:this.job,
          notes:this.notes}
          await this.$store.dispatch('ADD_NEWJOB',user)
          this.visible = false
      }
    },
    data() {
        return {
          visible:false,
          job:'',
          notes:''
        }
      }
    }
</script>
  