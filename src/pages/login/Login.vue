<template>
  <form class="form-login">
    <div class="card">
      <div class="card-header text-center">
      <h1 class="mb-0">Gastei Quanto</h1>
      </div>
      <div class="card-body">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="E-mail">
        </div>
        <div class="form-group">
          <input type="password" class="form-control" placeholder="Senha">
        </div>
        <button class="btn btn-primary w-100">
          Enviar
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped>
.form-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh
}
.card{
  width: 25%;
  color: var(--darker)
}

</style>
