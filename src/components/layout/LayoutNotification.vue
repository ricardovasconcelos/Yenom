<template>
  <div
  class="alert alert-dismissible fade show"
  :class="`alert-${type}`"
  v-if="show">
    {{message}}
    <button type="button" class="close" @click="close()">
        <span>&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      type: 'danger'
    }
  },
  created () {
    this.$root.$on('Notification::show', payload => {
      this.show = true
      this.type = payload.type
      this.message = payload.message

      setTimeout(() => { this.close() }, payload.timeout || 4000)
    })
  },
  methods: {
    close () {
      this.message = ''
      this.type = 'danger'
      this.show = false
    }
  }
}
</script>

<style scoped>
.alert{
  top:20px;
  right:20px;
  max-width: 400px;
  z-index: 9999;
  position: absolute
}
</style>
