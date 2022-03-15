<template>
    <div class="img-01 py-6 mb-5 mt-56px"></div>
<div class="container">
  <div class="row flex-column flex-md-row">
    <ul class="col-12 col-md-3 d-flex flex-column align-items-center text-secondary">
      <li class="mb-2">全部商品</li>
      <li class="mb-2">原型香料</li>
      <li class="mb-2">研磨香料</li>
      <li class="mb-2">香料組合</li>
      <li class="mb-2">香料禮盒</li>
      <li class="mb-2">香料工具</li>
    </ul>
    <div class="card-group col-12 col-md-9">
      <div class="row row-cols-lg-3 row-cols-sm-2 row-cols-1">
        <div class="col mb-4" v-for="product in products" :key="product.id">
          <div class="card border-0">
            <img :src="product.imageUrl" class="card-img-top" :alt="product.title">
            <div class="card-body py-2 px-0">
              <h5 class="card-title mb-0 text-secondary">{{product.title}}</h5>
            </div>
            <div class="card-footer p-0 border-0">
              <router-link class="btn btn-outline-secondary"
              :to="`/product/${product.id}`" style="width:100%"
              >查看更多</router-link>
              <div class="d-flex justify-content-between mt-1">
                <div class="d-flex border border-secondary align-items-center">
                  <span class="bi bi-dash fs-5 px-1"
                  @click="minusNum(product)"></span>
                  <input type="number" class="form-control p-0 text-center border-0 bg-light"
                  value="1" :ref="`item${product.id}`"
                  min="1" style="max-width:2rem; height:100%">
                  <span class="bi bi-plus fs-5 px-1"
                  @click="addNum(product)"></span>
                </div>
                <button class="btn btn-primary" type="button"
                @click="addToCart(product, num = 1)"
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
    <div class="d-flex justify-content-md-end justify-content-center my-4">
      <pagination :pages="pagination" @get-products="getProducts"></pagination>
    </div>
  </div>
</div>
</template>
<script>
import emitter from '@/libs/emitter.js'
import pagination from '@/components/PageView.vue'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      isLoading: ''
    }
  },
  components: {
    pagination
  },
  methods: {
    getProducts (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/?page=${page}`)
        .then(res => {
          console.log(res)
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(err => {
          alert(err)
        })
    },
    addNum (product) {
      const numInput = this.$refs[`item${product.id}`]
      numInput[0].value++
    },
    minusNum (product) {
      const numInput = this.$refs[`item${product.id}`]
      numInput[0].value--
      if (numInput[0].value < 1) {
        numInput[0].value = 1
      }
    },
    addToCart (product, num = 1) {
      const numInput = this.$refs[`item${product.id}`]
      const data = {
        product_id: product.id,
        qty: Number(numInput[0].value)
      }
      this.isLoading = product.id
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then(res => {
          console.log(res.data)
          this.$httpMessageState(res, '加入購物車')
          numInput[0].value = 1
          emitter.emit('get-cart')
          this.isLoading = ''
        })
        .catch(err => {
          alert(err)
          this.isLoading = ''
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style lang="scss">
.img-01{
  background-image: url(../assets/a12.jpg);
  background-size: cover;
  background-position: center center ;
}
</style>
