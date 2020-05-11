<template>
  <form @submit.prevent="doSignup()" class="form-login">
    <div class="card">
      <div class="card-header text-center">
      <h1 class="mb-0">Yenom</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input type="email" class="form-control" placeholder="E-mail" required v-model="email">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Senha" required v-model="password">
        </div>
        <button class="btn btn-primary w-100">
          <template v-if="loading" :disabled="loading">
          Cadastrando...
          <i class="fa fa-spinner fa-spin"></i>
          </template>
          <template v-else>
          Cadastrar
          <i class="fa fa-sign-in-alt"></i>
          </template>
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async doSignup () {
      this.loading = true
      const { email, password } = this

      try {
        await this.$firebase.auth().createUserWithEmailAndPassword(email, password)

        this.$router.push({ name: 'home' })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          message: 'Não possivel realizar cadastro, tente novamente.',
          type: 'danger'
        })
      }
      this.loading = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'home' })
      }
    })
  }
}

</script>

<style lang="scss" scoped>
.form-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  h1 {
    font-size: 18;
  }

  .card{
  width: 30%;
  color: var(--darker)
}
}

</style>
