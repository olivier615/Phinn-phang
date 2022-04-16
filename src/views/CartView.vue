<template>
  <div class="container mt-80">
    <div class="row justify-content-center mb-7">
      <div class="col-12 col-md-10" v-if="carts.carts?.length !== 0">
          <h3 class="text-center m-3 text-secondary fw-bolder mt-5">
            您的購物車
          </h3>
          <table class="table text-secondary">
            <thead class="text-secondary">
              <tr>
                <th class="d-none d-md-table-cell">#</th>
                <th>品名</th>
                <th>數量</th>
                <th class="d-none d-md-table-cell">售價</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, keys) in carts.carts" :key="item">
                <th class="d-none d-md-table-cell">{{ keys + 1 }}</th>
                <td>
                  <router-link :to="`/product/${item.product.id}`" class="mb-0">
                    {{item.product.title}}
                  </router-link>
                  <span class="d-md-none d-black"><br>{{ item.total }} 元</span>
                </td>
                <td>
                  <div class="d-flex">
                    <a href="" @click.prevent="editNum('minus', keys, item)">
                      <span class="bi bi-dash fs-4 px-1"></span>
                    </a>
                    <input type="number" class="form-control p-0 text-center text-primary"
                    v-model.number="item.qty" @change="editNum('edit', keys, item)"
                    min="1" style="max-width:3rem; min-width: 2rem">
                    <a href="" @click.prevent="editNum('add', keys, item)">
                      <span class="bi bi-plus fs-4 px-1"></span>
                    </a>
                    <p class="pt-1 m-0 d-md-black d-none">{{ item.product.unit }}</p>
                  </div>
                </td>
                <td class="d-none d-md-table-cell">{{ item.total }}</td>
                <td>
                  <span
                  class="spinner-border spinner-border-sm fs-5 text-primary" role="status"
                  v-if="isLoading === item.id"
                  ></span>
                  <a v-else href=""><span class="bi bi-trash3 fs-5 text-primary" @click.prevent="deleteItem(item)"></span></a>
                </td>
              </tr>
            </tbody>
            <tfoot class="text-secondary">
              <tr>
                <td colspan="4" class="text-end d-none d-md-table-cell">總計</td>
                <td colspan="2" class="text-end d-table-cell d-md-none">總計</td>
                <td class="text-end">
                  {{ carts.total }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="d-flex justify-content-between">
            <button class="btn btn-outline-secondary"
            @click="OpenDeleteCartsModal"
            :disabled="isLoading === true || isLoading !== ''">
              <span>
                <span class="spinner-border spinner-border-sm fs-5 text-secondary" role="status"
                v-if="isLoading === true"></span>清空購物車
              </span>
            </button>
            <router-link to="/order">
              <button class="btn btn-primary" :disabled="isLoading === true || isLoading !== ''">開始結帳</button>
            </router-link>
          </div>
      </div>
      <div class="text-center text-primary mt-6" v-else>
        <h3>購物車還是空的！</h3>
        <div class="mt-3">
          <button @click="backToPreviousPage" type="button"
          class="btn btn-outline-secondary me-1">
            回上一頁
          </button>
          <router-link to="/products" class="btn btn-primary ms-1">
            再去逛逛
          </router-link>
        </div>
      </div>
    </div>
      </div>
    <swiper />
    <DeleteCart ref="DeleteCartsModal"
    @update="getCarts" />
</template>

<script>
import emitter from '@/libs/emitter.js'
import DeleteCart from '@/components/DeleteCart.vue'
import swiper from '@/components/SwiperView.vue'
export default {
  components: {
    swiper,
    DeleteCart
  },
  data () {
    return {
      carts: [],
      isLoading: ''
    }
  },
  methods: {
    getCarts () {
      emitter.emit('page-loading', true)
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then(res => {
          this.carts = res.data.data
          emitter.emit('page-loading', false)
        })
        .catch(err => {
          alert(err)
          emitter.emit('page-loading', false)
        })
    },
    editNum (execute, key, item) {
      this.isLoading = item.id
      if (execute === 'add') {
        this.carts.carts[key].qty += 1
      } else if (execute === 'minus') {
        this.carts.carts[key].qty -= 1
        if (this.carts.carts[key].qty === 0) {
          this.deleteItem(item)
          return
        }
      }
      const data = {
        product_id: item.product.id,
        qty: this.carts.carts[key].qty
      }
      this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
        { data }
      )
        .then(res => {
          this.getCarts()
          emitter.emit('get-cart')
          this.isLoading = ''
        })
        .catch(err => {
          console.dir(err)
          this.isLoading = ''
        })
    },
    OpenDeleteCartsModal () {
      this.$refs.DeleteCartsModal.openModal()
    },
    deleteItem (item) {
      this.isLoading = item.id
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`)
        .then(res => {
          this.getCarts()
          emitter.emit('get-cart')
          this.$httpMessageState(res, '刪除商品')
          this.isLoading = ''
        })
        .catch(err => {
          console.dir(err)
          this.isLoading = ''
        })
    },
    deleteCart () {
      this.isLoading = true
      this.$http.delete(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`)
        .then(res => {
          window.scroll(0, 0)
          this.getCarts()
          emitter.emit('get-cart')
          this.$httpMessageState(res, '清除購物車')
          this.isLoading = ''
        })
        .catch(err => {
          console.dir(err)
          this.isLoading = ''
        })
    },
    backToPreviousPage () {
      this.$router.back(-1)
    }
  },
  mounted () {
    window.scroll(0, 0)
    this.getCarts()
    emitter.on('get-cart', () => {
      this.getCarts()
    })
  },
  unmounted () {
    emitter.off()
  }
}
</script>
