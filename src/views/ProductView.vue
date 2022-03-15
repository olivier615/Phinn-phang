<template>
  <div class="container mt-56px">
    <div class="card mb-3 border-0">
      <div class="row g-0">
        <div class="col-md-6">
          <img :src="product.imageUrl" class="img-fluid rounded-start" :alt="product.title" />
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <span class="text-secondary">{{product.category}}</span>
            <h5 class="card-title fs-3 mb-3 mt-2 text-secondary">{{product.title}}</h5>
            <p class="card-text text-secondary">
              {{product.content}}
            </p>
            <p class="text-secondary">
              {{product.description}}
            </p>
            <p class="text-secondary">
              產地：{{product.origin_place}}
            </p>
            <p class="card-text text-secondary">
              <small>原價
                <del>
                  {{product.origin_price}}
                </del>
                元
              </small>
              特價{{product.price}}元
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
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then(res => {
          this.product = res.data.product
        })
        .catch(err => {
          alert(err)
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
          console.log(res.data)
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
    this.getProduct()
  }
}
</script>
