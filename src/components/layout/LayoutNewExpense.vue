<template>
  <div class="w-100 d-flex align-items-center justify-content-center">
    <button @click="showModal = true" class="btn btn-lg btn-outline-primary w-80">
      <i class="fa fa-plus"></i>
      Novo Gasto
    </button>

    <form @submit.prevent="submit">
    <div
      class="modal fade"
      :class="{show: showModal}"
      :style="{display: showModal ? 'block' : 'none'}"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Adicionar um novo gasto</h5>
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="row">
                <div class="form-group col-8">
                  <label for="">Descrição:</label>
                  <input type="text" class="form-control" required v-model="form.description">
                </div>
                <div class="form-group col-4">
                  <label for="">Valor (R$):</label>
                  <input type="text" class="form-control" required v-model="form.value">
                </div>
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Fechar</button>
            <button class="btn btn-primary">Incluir novo gasto</button>
          </div>
        </div>
      </div>
    </div>
    </form>
    <div
      class="modal-backdrop fade"
      :class="{show: showModal}"
      :style="{display: showModal ? 'block' : 'none'}"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'LayoutNewExpense',
  data () {
    return {
      showModal: false,
      form: {
        description: '',
        value: ''
      }
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    },

    submit () {
      this.$root.$emit('Spinner::show')
      const ref = this.$firebase.database().ref(window.uid)
      const id = ref.push().key

      const payload = {
        id,
        receipt: '',
        value: this.form.value,
        createdAt: new Date().getTime(),
        description: this.form.description
      }

      ref.child(id).set(payload, err => {
        this.$root.$emit('Spinner::hide')
        if (err) {
          console.error(err)
        } else {
          this.closeModal()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  color: var(--darker);
}
</style>
