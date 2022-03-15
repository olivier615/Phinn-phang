<template>
<Loading :active="isLoading" :z-index="1060"></Loading>
  <h2>後台-訂單列表</h2>
  <div class="container">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>訂單編號</th>
            <th>訂購者</th>
            <th>金額</th>
            <th>支付狀態</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>
              {{order.id}}
            </td>
            <td>{{ order.user.name }}</td>
            <td>{{ order.total }}</td>
            <td>
              <span v-if="order.is_paid" class="badge bg-primary">已支付</span>
              <span v-else class="badge bg-dark">未付款</span>
            </td>
            <td>
              <div class="btn-group">
                <router-link class="btn btn-outline-primary btn-sm"
                :to="`/admin/order/${order.id}`">
                  編輯訂單
                </router-link>
                <button class="btn btn-danger btn-sm"
                @click="OpenDeleteOrderModal(order)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 分頁元件 -->
    <pagination :pages="pagination" @getProducts="getOrders"></pagination>
    <deleteOrder
      :order="order"
      ref="delOrderModal"
      @update="getOrders(pagination.current_page)"
      ></deleteOrder>
  </div>
</template>

<script>
import pagination from '@/components/PageView.vue'
import deleteOrder from '@/components/DeleteOrder.vue'
export default {
  components: {
    pagination,
    deleteOrder
  },
  data () {
    return {
      isLoading: false,
      orders: [],
      pagination: {},
      order: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getOrders (page = 1) {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders/?page=${page}`
        )
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
        })
    },
    OpenDeleteOrderModal (order) {
      this.order = order
      this.$refs.delOrderModal.openModal()
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>
