<template>
  <div>
    
  </div>
</template>

<script>
  export default {
    name: 'UserDrawerForm',
    data(){
      return{
        form: this.$form.createForm(this)
      }
    },
    props: {
      user: Object,
    },
  }
</script>
