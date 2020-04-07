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
                <dev class="form-group col-12 flex-column d-flex align-items-center">
                  <input type="file" class="d-none" accept="image/*" ref="input" @change="handleFile($event)">
                  <button type="button" class="btn btn-outline-secondary w-50" @click="openFileDialog">
                    Adicionar Comprovante
                  </button>
                  <div class="mt-2" v-if="form.receipt">
                      {{form.receipt.name}}
                      <button type="button" @click="form.receipt = ''" class="btn badge bagde-light">
                        <i class="fa fa-trash text-danger"></i>
                      </button>
                  </div>
                </dev>
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
        value: '',
        receipt: ''
      }
    }
  },
  computed: {
    fileName () {
      const { receipt } = this.form
      if (receipt) {
        const split = receipt.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    closeModal () {
      this.showModal = false
    },

    openFileDialog () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    handleFile ({ target }) {
      this.form.receipt = target.files[0]
    },
    async submit () {
      let url = ''

      try {
        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key

        if (this.form.receipt) {
          const snapshot = await this.$firebase.storage()
            .ref(window.uid)
            .child(this.fileName)
            .put(this.form.receipt)

          url = await snapshot.ref.getDownloadURL()
        }

        const payload = {
          id,
          ...this.form,
          receipt: url,
          createdAt: new Date().getTime()
        }

        ref.child(id).set(payload, err => {
          if (err) {
            console.error(err)
          } else {
            this.closeModal()
          }
        })
      } catch (err) {
        console.error(err)
      } finally {
        this.$root.$emit('Spinner::hide')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  color: var(--darker);
}
</style>
