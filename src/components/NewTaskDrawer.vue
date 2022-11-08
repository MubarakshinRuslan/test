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
                  v-decorator="[
                    'name',
                    {
                      rules: [{ required: true, message: 'Введите название задачи' }],
                    },
                  ]"
                  placeholder="Введите название задачи"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Описание">
                <a-textarea
                  v-decorator="[
                    'description',
                    {
                      rules: [{ required: true, message: 'Введите описание задачи' }],
                    },
                  ]"
                  :rows="4"
                  placeholder="Введите описание задачи"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item label="Исполнитель">
                <a-select
                  v-decorator="[
                    'owner',
                    {
                      rules: [{ required: true, message: 'Выберите исполнителя' }],
                    },
                  ]"
                  placeholder="Выберите исполнителя"
                >
                  <a-select-option v-for="i in this.$store.getters.JOBS" :key="i.job">
                    {{i.job}}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="Type">
                <a-select
                  v-decorator="[
                    'type',
                    {
                      rules: [{ required: true, message: 'Please choose the type' }],
                    },
                  ]"
                  placeholder="Please choose the type"
                >
                  <a-select-option value="private">
                    Private
                  </a-select-option>
                  <a-select-option value="public">
                    Public
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              
            </a-col>
            <a-col :span="24">
              <a-form-item label="DateTime">
                <a-range-picker
                :default-value="[moment('2022/01/01', dateFormat), moment('2023/01/01', dateFormat)]"
                :format="dateFormat"
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
            Cancel
          </a-button>
          <a-button type="primary" @click="onClose">
            Submit
          </a-button>
        </div>
      </a-drawer>
    </div>
  </template>
  <script>
  import moment from 'moment'
  export default {
    data() {
      return {
        dateFormat: 'YYYY/MM/DD',
        form: this.$form.createForm(this),
        visible: false,
      };
    },
    methods: {
        moment,
      showDrawer() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
    },
  };
  </script>
  