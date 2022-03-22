<template>
  <div class="container">
    <Loading :active="isLoading" :z-index="1060"></Loading>
    <h2>後台-產品列表</h2>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openProductPage('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">促銷方式</th>
          <th width="60">原價</th>
          <th width="60">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>
            <div class="d-flex">
              <span
                v-for="tag in item.promotion"
                :key="tag+item.title"
                :class="{
                  'bg-primary': tag === '新品',
                  'bg-danger': tag === '熱門',
                  'bg-success': tag === '特價',
                }"
                class="badge rounded-pill me-1"
                >{{ tag }}</span
              >
            </div>
          </td>
          <td class="text-end">{{ item.origin_price }}</td>
          <td class="text-end">{{ item.price }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <router-link :to="`/admin/product/${item.id}`"
              class="btn btn-outline-primary btn-sm">
                編輯
              </router-link>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="OpenDeleteProductModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <pagination :pages="pagination" @get-products="getProducts"></pagination>
  </div>
  <deleteProduct :edit-product="editProduct"
  ref="delProductModal"
  @update="getProducts(pagination.current_page)"
  ></deleteProduct>
</template>

<script>
import pagination from '@/components/PageView.vue'
import deleteProduct from '@/components/DeleteProduct.vue'
export default {
  components: {
    pagination,
    deleteProduct
  },
  data () {
    return {
      isLoading: false,
      url: process.env.VUE_APP_API,
      path: process.env.VUE_APP_PATH,
      products: [],
      editProduct: {
        imagesUrl: [],
        promotion: []
      },
      isNew: false,
      pagination: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      this.$http.get(`${this.url}/api/${this.path}/admin/products/?page=${page}`)
        .then(res => {
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
          alert('無法取得產品列表')
        })
    },
    openProductPage (isNew, item) {
      // 參數 isNew 是 根據 @click="fn()" 所帶的字串
      if (isNew === 'new') {
        this.editProduct = {
          imagesUrl: [],
          promotion: []
        } // 清空 editProduct 資料
        this.isNew = true // 新資料
        // productModal.show();
        this.$router.push('/admin/product')
      } else if (isNew === 'edit') {
        this.editProduct = {
          imagesUrl: [],
          promotion: []
        }
        this.editProduct = {
          ...item
        }
        // 參數 item 是 <tr v-for...> 的 item (product)
        this.isNew = false // 舊資料
        // productModal.show();
        this.$router.push('/product/:id')
      }
    },
    OpenDeleteProductModal (item) {
      this.editProduct = {
        ...item
      }
      this.$refs.delProductModal.openModal()
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
