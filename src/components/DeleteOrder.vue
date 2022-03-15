<template>
  <div
    id="delOrderModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delOrderModalLabel" class="modal-title">
            <span>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>訂單編號：{{order.id}}</p>
          <p>訂購者：{{order.user.name}}</p>
          <div>
            <span>支付狀態：</span>
            <span v-if="order.is_paid" class="badge bg-primary">已支付</span>
            <span v-else class="badge bg-dark">未付款</span>
          </div>
          <p class="text-center">
            <strong class="text-danger">(訂單刪除後將無法恢復)。</strong>
          </p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-danger"
          @click="deleteOrder">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  data () {
    return {
      modal: ''
    }
  },
  props: ['order'],
  methods: {
    deleteOrder () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${this.order.id}`)
        .then(res => {
          alert(res.data.message)
          this.hideModal()
          this.$emit('update')
        })
        .catch(err => {
          alert(err.message)
        })
    },
    openModal () {
      this.modal.show()
    },
    hideModal () {
      this.modal.hide()
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static'
    })
  }
}
</script>
