<template>
<nav class="nav flex-column justify-content-between">
  <div>
  <router-link
  exact
  exact-active-class="active"
  :key="i"
  class="nav-link"
  :to="{name: router.name}"
  v-for="(router, i) in routerLinks"
  >
  <i class="fa" :class="`fa-${router.meta.icon}`"></i>
    {{router.meta.title}}
  </router-link>

  <hr>

  <layout-new-expense/>

  </div>

  <LayoutLogout/>
</nav>
</template>

<script>
import LayoutLogout from './LayoutLogout'
import LayoutNewExpense from './LayoutNewExpense'
export default {
  name: 'LayoutNavigation',
  components: {
    LayoutLogout,
    LayoutNewExpense
  },
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(route => route.name !== 'login')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  margin-left: -15px;
  width: calc(100% + 30px);
  height: calc(100vh - 49px);

  .nav-link{
    color: var(--white);
    transition: .4s;
    &.active {
      color: var(--featured);
      background-color: transparent;
    }
    &:hover {
      color: var(--dark);
      background-color: var(--featured);
    }
  }
}

</style>
