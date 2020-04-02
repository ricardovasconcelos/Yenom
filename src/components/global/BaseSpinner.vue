<template>
  <div class="base-spinner fa-3x" v-if="visible">
    <i class="fas fa-circle-notch fa-spin"></i>
  </div>
</template>

<script>
export default {
  name: 'BaseSpinner',
  data () {
    return {
      visible: true
    }
  },
  created () {
    this.$root.$on('Spinner::show', () => { this.visible = true })

    this.$root.$on('Spinner::hide', () => { this.visible = false })
  }

}
</script>

<style lang="scss" scoped>
.base-spinner{
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--dark-medium);
  color: var(--featured);
}
</style>
