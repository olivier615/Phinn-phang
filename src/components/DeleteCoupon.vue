<template>
  <div
    id="delCouponModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delCouponModal" class="modal-title">
            <span>刪除優惠券</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p class="text-center">
            確定刪除{{coupon.title}}？
            <strong class="text-danger">(刪除優惠券後將無法恢復)。</strong>
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
          @click="deleteCoupon">
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
  props: ['coupon'],
  methods: {
    deleteCoupon () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${this.coupon.id}`)
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
