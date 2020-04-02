<template>
  <div id="app">
    <base-spinner/>
    <router-view/>
  </div>
</template>

<script>

import BaseSpinner from './components/global/BaseSpinner.vue'

export default {
  name: 'App',
  components: {
    BaseSpinner
  },
  mounted () {
    console.log(this.$firebase)
  },
  methods: {
    showSpinner () {
      this.$root.$emit('Spinner::show')
    }
  }
}
</script>
<style lang="scss">
#app{
  min-height: 100vh;
  color: var(--light);
  background-color: var(--darker);
}
</style>
