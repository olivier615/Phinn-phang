<template>
  <div
    id="delArticleModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delArticleModal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delArticleModal" class="modal-title">
            <span>刪除文章</span>
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
            確定刪除{{article.title}}？
            <strong class="text-danger">(刪除文章後將無法恢復)。</strong>
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
          @click="deleteArticle">
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
  props: ['article'],
  methods: {
    deleteArticle () {
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${this.article.id}`)
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
