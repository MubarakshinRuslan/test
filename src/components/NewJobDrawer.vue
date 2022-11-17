
  <template>
    <div>
      <div>
      <a-button type="primary" @click="showDrawer"> <a-icon type="plus" /> Добавить должность </a-button>
      <a-drawer
        :title="drawerTitle"
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
            {{submitButtonText}}
          </a-button>
        </div>
      </a-drawer>
      </div>
    </div>
  </template>
  
<script>
  export default {
    methods: {
      showDrawer() {
        this.drawerTitle='Добавить должность'
        this.submitButtonText = 'Добавить должность'
        this.isEdit = false
        this.visible = true
        this.job=''
        this.notes=''
      },
      showDrawerEdit(key){
        this.forEditKey = key
        this.submitButtonText = "Изменить должность"
        this.drawerTitle = 'Изменить должность'
        this.isEdit = true
        this.visible = true
        const data=[...this.$store.getters.JOBS]
        let id = data.findIndex(element => element.id === key)
        this.job=data.at(id).job
        this.notes=data.at(id).notes
      },
      onClose() {
        this.visible = false
        this.job=''
        this.notes=''
      },
      async onSubmit(){
        const user = {
          job:this.job,
          notes:this.notes
        }
        if(this.isEdit){
          user.id=this.forEditKey
          await this.$store.dispatch('EDIT_JOB',user)
        }else{
          await this.$store.dispatch('ADD_NEWJOB',user)
        }
          this.visible = false
      }
    },
    data() {
        return {
          forEditKey:0,
          submitButtonText:'',
          drawerTitle:'',
          isEdit:false,
          visible:false,
          job:'',
          notes:''
        }
      },
      props: {
        item: Object,
      },
    }

</script>
  