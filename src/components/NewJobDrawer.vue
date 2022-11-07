<template>
    <div>
      <a-button type="primary" @click="showDrawer"> <a-icon type="plus" /> Добавить сотрудника </a-button>
      <a-drawer
        title="Добавить сотрудника"
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
                  v-decorator="[
                    'lastname',
                    {
                      rules: [{ required: true, message: 'Введите фамилию' }],
                    },
                  ]"
                  placeholder="Введите фамилию"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Имя">
                    <a-input
                        v-decorator="[
                            'firstname',
                            {
                                rules: [{required: true, message: 'Введите имя'}],
                            }
                        ]"
                        placeholder="Введите имя"
                    />
                </a-form-item>
            </a-col>
            <a-col :span="8">
                <a-form-item label="Отчество">
                    <a-input
                        v-decorator="[
                            'patronym',
                            {
                                rules: [{required: false, message: 'Введите отчество'}],
                            }
                        ]"
                        placeholder="Введите отчество"
                    />
                </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Выберите должность">
                <a-select
                  v-decorator="[
                    'owner',
                    {
                      rules: [{ required: true, message: 'Выберите должность' }],
                    },
                  ]"
                  placeholder="Выберите должность"
                >
                  <a-select-option value="xiao">
                    Xiaoxiao Fu
                  </a-select-option>
                  <a-select-option value="mao">
                    Maomao Zhou
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-item label="Дополнительные заметки">
                <a-textarea
                  v-decorator="[
                    'description',
                    {
                      rules: [{ required: false, message: 'Поле для дополнительных заметок' }],
                    },
                  ]"
                  :rows="4"
                  placeholder="Поле для дополнительных заметок"
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
          <a-button type="primary" @click="onClose">
            Добавить сотрудника
          </a-button>
        </div>
      </a-drawer>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {
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
    },
  };
  </script>
  