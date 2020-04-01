<template>
  <div id="app">

    <base-spinner/>
    <button @click="showSpinner()">
    Alternar Spinner
    </button>
    <!-- <router-view/> -->
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

</style>
