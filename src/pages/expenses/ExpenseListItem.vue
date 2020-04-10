<template>
  <div class="expense-list-item row">

    <div class="col-10">
      <div class="description">
        <span>
        {{data.description}}
        </span>
        <button
        class="btn btn-sm btn-outline-primary"
        v-if="data.receipt"
        @click="showReceipt">
          <i class="fa fa-external-link-alt"></i>
          Ver comprovante

        </button>
        </div>
      <small v-data-format="data.createdAt"/>
    </div>
    <div class="col-2" v-money-format="data.value"/>
  </div>

</template>

<script>
export default {
  name: 'ExpenseListItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    showReceipt () {
      window.open(this.data.receipt, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.expense-list-item {
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--dark-medium);

  .description{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
