<template>
<Loading :active="isLoading" :z-index="1060"></Loading>
  <h2>單一產品頁面</h2>
      <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close bg-light" aria-label="Close" @click="cancelEdit"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input type="file" class="form-control mb-3" id="file"
                @change="upload" placeholder="選擇圖片上傳">
                <input v-model="product.imageUrl" type="text" class="form-control mb-2" placeholder="請輸入圖片連結">
                <img class="img-fluid" :src="product.imageUrl">
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <div v-if="Array.isArray(product.imagesUrl)">
                <!-- 確認 editProduct.imagesUrl 是否為陣列 -->
                <div class="mb-1" v-for="(image,keys) in product.imagesUrl" :key="keys">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結"
                      v-model="product.imagesUrl[keys]">
                    <!-- 利用 keys 找到 imagesUrl 每張圖片的位置 -->
                  </div>
                  <img class="img-fluid" :src="image">
                </div>
                <div v-if="!product.imagesUrl.length || product.imagesUrl[product.imagesUrl.length - 1]">
                  <button class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="product.imagesUrl.push('')">
                    新增圖片
                  </button>
                </div>
                <div>
                  <button class="btn btn-outline-danger btn-sm d-block w-100" @click="product.imagesUrl.pop()">
                    刪除圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <!-- 若出現 v-else 代表 imagesUrl 不是陣列,則使用 createImagesUrl() -->
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImagesUrl()">
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="product.title">
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                    v-model="product.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="product.unit">
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                    v-model.number="product.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                    v-model.number="product.price">
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_place" class="form-label">原產地</label>
                  <input id="origin_place" type="text" class="form-control" placeholder="請輸入原產地"
                    v-model="product.origin_place">
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                  v-model="product.description">
                  </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                  v-model="product.content">
                  </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                    v-model="product.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
          @click="cancelEdit">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
</template>
<script>
let fileInput = null
export default {
  data () {
    return {
      isLoading: false,
      product: {
        imagesUrl: []
      },
      isNew: false
    }
  },
  methods: {
    getProduct () {
      this.isLoading = true
      const { id } = this.$route.params
      if (id === undefined) {
        this.isNew = true
        this.isLoading = false
      } else {
        this.$http.get(
            `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`
        )
          .then((res) => {
            this.product = res.data.product
            this.isLoading = false
          })
          .catch((err) => {
            this.isLoading = false
            console.log(err)
          })
      }
    },
    upload () {
      this.isLoading = true
      const file = fileInput.files[0] // 使用 console.dir 找到 fileInput.files 類陣列的位置
      const formData = new FormData() // 建立 api 上傳資料 所需格式
      formData.append('file-to-upload', file)
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload/`, formData)
        .then(res => {
          console.log(res.data.imageUrl)
          this.product.imageUrl = res.data.imageUrl
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    createImagesUrl () {
      this.product.imagesUrl = []
      this.product.imagesUrl.push('')
    },
    updateProduct () {
      this.isLoading = true
      if (!this.isNew) {
        this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product/${this.product.id}`, {
          data: this.product
        })
          .then(res => {
            alert(res.data.message)
            this.isLoading = false
            this.$router.push('/admin/products')
          })
          .catch(err => {
            this.isLoading = false
            alert(err)
          })
      } else {
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`, {
          data: this.product
        })
          .then(res => {
            alert(res.data.message)
            this.isLoading = false
            this.$router.push('/admin/products')
          })
          .catch(err => {
            this.isLoading = false
            alert(err)
          })
      }
    },
    cancelEdit () {
      this.product = {
        imagesUrl: []
      }
      this.$router.push('/admin/products')
    }
  },
  mounted () {
    this.getProduct()
    fileInput = document.querySelector('#file')
  }
}
</script>
