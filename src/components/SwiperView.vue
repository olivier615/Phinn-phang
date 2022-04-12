<template>
<div class="container-fluid bg-info">
  <div class="pb-3">
    <div class="d-flex justify-content-center">
      <h4 class="my-4 fw-bolder text-secondary">熱門商品</h4>
    </div>
    <swiper
      :slidesPerView="slidesPerView"
      :spaceBetween="spaceBetween"
      :slidesPerGroup="1"
      :loop="true"
      :loopFillGroupWithBlank="true"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"
      class="mySwiper pb-5"
    >
      <swiper-slide v-for="product in products" :key="product.id">
        <div class="card border-0">
          <img :src="product.imageUrl" class="card-img-top" :alt="product.title">
          <div class="card-body py-2 p-0">
            <h5 class="card-title mb-0 text-secondary fs-6">{{ product.title }}</h5>
          </div>
          <div class="card-footer p-0 border-0 d-flex justify-content-between">
            <router-link class="btn btn-outline-secondary"
            :to="`/product/${product.id}`">查看更多</router-link>
            <button class="btn btn-primary" type="button"
            @click="addToCart(product, num = 1)">
              <div v-if="isLoading === product.id">
                <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                <span>請稍後...</span>
              </div>
              <span v-else>加入購物車</span>
            </button>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</div>
</template>
<script>
import emitter from '@/libs/emitter.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination } from 'swiper'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  setup () {
    return {
      modules: [Pagination]
    }
  },
  data () {
    return {
      isLoading: '',
      products: [],
      swiper: {},
      slidesPerView: 4,
      spaceBetween: 24
    }
  },
  methods: {
    getProducts (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then(res => {
          this.products = res.data.products
        })
        .catch(err => {
          alert(err)
        })
    },
    addToCart (product, num = 1) {
      this.isLoading = product.id
      const data = {
        product_id: product.id,
        qty: num
      }
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`, { data })
        .then(res => {
          this.$httpMessageState(res, '加入購物車')
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
    if (document.body.offsetWidth >= 992) {
      this.slidesPerView = 4
      this.spaceBetween = 24
    } else if (document.body.offsetWidth >= 768) {
      this.slidesPerView = 3
      this.spaceBetween = 24
    } else if (document.body.offsetWidth >= 576) {
      this.slidesPerView = 2
      this.spaceBetween = 16
    } else if (document.body.offsetWidth < 576) {
      this.slidesPerView = 1
      this.spaceBetween = 0
    }
  }
}
</script>

<style lang="scss">
.swiper-pagination-bullet-active {
    opacity: var(--swiper-pagination-bullet-opacity, 1);
    background: var(--swiper-pagination-color,var(--bs-primary));
}
</style>
