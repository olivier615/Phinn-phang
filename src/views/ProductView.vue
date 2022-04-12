<template>
<div class="img-banner-ProductView mt-80 img-banner mb-6" />
  <div class="container">
    <div class="card mb-3 border-0">
      <div class="row g-0">
        <div class="offset-1">
          <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/products">產品列表</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/products">{{ product.category }}</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
            </ol>
          </nav>
        </div>
        <div class="col-md-5 offset-1">
          <img :src="product.imageUrl" class="img-fluid rounded-start" :alt="product.title" />
        </div>
        <div class="col-md-5">
          <div class="card-body pt-0">
            <span class="text-secondary">{{ product.category }}</span>
            <h5 class="card-title fs-3 mb-3 mt-2 text-secondary">{{ product.title }}</h5>
            <p class="card-text text-secondary">
              {{ product.content }}
            </p>
            <p class="text-secondary">
              {{ product.description }}
            </p>
            <p class="card-text text-secondary fs-4">
              <small class="fs-6">原價
                <del>
                  {{ product.origin_price }}
                </del>
                元
              </small><br>
              特價{{ product.price }}元
            </p>
            <div class="d-flex justify-content-end mt-4">
              <div class="d-flex border border-secondary me-3">
                <span class="bi bi-dash fs-4 px-1 text-secondary"
                @click="minusNum()"></span>
                <input type="number" class="form-control p-0 text-center border-0"
                v-model="num"
                min="1" style="max-width:3rem">
                <span class="bi bi-plus fs-4 px-1 text-secondary"
                @click="addNum()"></span>
              </div>
              <button class="btn btn-primary" type="button"
              @click="addToCart(product.id, num)"
              :disabled="isLoading === product.id">
              <div v-if="isLoading === product.id">
                  <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                  <span>請稍後...</span>
                </div>
              <span v-else>加入購物車</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion col-10 offset-1" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            有效期限與保存方式
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body text-secondary">
            製造日期與有效期限印刷於商品包裝，拆封後須密封置於冷藏，避免受潮或陽光直射。建議於拆封後 3 個月內使用完畢，如發現內容物變色，受潮，請立即丟棄。
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            訂單查詢與配送方式
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div class="accordion-body text-secondary">
            訂單成立後，將在 1-3 個工作天內寄出您的商品，您可以於 查詢訂單 查看您的訂單狀態，有任何問題請聯繫我們。
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            退/換貨方式
          </button>
        </h2>
        <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
          <div class="accordion-body text-secondary">
            在您收到商品後 7 日內享有退/換貨免運費，但須保持商品包裝完整<br>
            若您發現您收到的商品與您的訂單不符，請聯繫我們，將有專人協助您處理。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      product: {},
      num: 1,
      isLoading: ''
    }
  },
  methods: {
    getProduct () {
      emitter.emit('page-loading', true)
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
          emitter.emit('page-loading', false)
        })
        .catch(err => {
          alert(err)
          emitter.emit('page-loading', false)
        })
    },
    addToCart (id, num = 1) {
      const data = {
        product_id: id,
        qty: num
      }
      this.isLoading = id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then(res => {
          emitter.emit('get-cart')
          this.$httpMessageState(res, '加入購物車')
          this.isLoading = ''
        })
        .catch(err => {
          alert(err)
          this.isLoading = ''
        })
    },
    addNum () {
      this.num++
    },
    minusNum () {
      if (this.num > 1) {
        this.num--
      }
    }
  },
  mounted () {
    window.scroll(0, 0)
    this.getProduct()
  }
}
</script>

<style lang="scss">
.img-banner-ProductView{
  background-image: url(../assets/image/pageBanner/banner-product.jpg);
  background-position: center left;
}
</style>
