<template>
  <div class="container mt-56px">
    <div class="row justify-content-center flex-md-row flex-column">
      <div class="col-md-5 col-12 mt-5">
        <h4 class="text-center text-secondary fw-bolder">訂單編號</h4>
        <p class="text-center text-secondary">{{order.id}}</p>
        <h4 class="text-center mt-4 text-secondary fw-bolder">訂單內容</h4>
          <table class="table">
            <thead class="text-secondary">
              <tr>
                <th>品名</th>
                <th>數量</th>
                <th>售價</th>
              </tr>
            </thead>
            <tbody class="text-secondary">
              <tr v-for="item in order.products" :key="item">
                <td>
                  <router-link :to="`/product/${item.product.id}`" class="mb-0">
                    {{ item.product.title }}
                  </router-link>
                </td>
                <td>
                  <div class="d-flex">
                    <p class="pt-1 m-0">{{ item.qty }}{{ item.product.unit }}</p>
                  </div>
                </td>
                <td>{{ item.total }}</td>
              </tr>
            </tbody>
            <tfoot class="text-secondary">
              <tr>
                <td colspan="2" class="text-end">訂單金額</td>
                <td class="text-end">{{order.total}}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      <div class="col-md-4 col-12 mt-5">
        <h4 class="text-center text-secondary fw-bolder mb-4">支付方式</h4>
          <div class="d-flex flex-column justify-content-center">
            <select class="form-select form-select-md mb-3" aria-label=".form-select-sm"
            v-model="payment">
              <option selected disabled>請選擇支付方式</option>
              <option value="信用卡">信用卡付款</option>
              <option value="銀行轉帳">銀行轉帳</option>
              <option value="貨到付款">貨到付款</option>
            </select>
            <button class="btn btn-primary mt-3" type="button"
            :disabled="payment === '請選擇支付方式' || isLoading === true"
            @click="orderPay">
              <span v-if="isLoading === true" class="spinner-border spinner-border-sm me-2" role="status"></span>
              <span>確定支付</span>
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orders: [],
      order: {},
      payment: '請選擇支付方式',
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      this.isLoading = true
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders`)
        .then(res => {
          this.orders = res.data.orders
          this.order = this.orders.filter(item => item.id === id)
          this.order = this.order[0]
          this.isLoading = false
        })
        .catch(err => {
          alert(err)
          this.isLoading = false
        })
    },
    orderPay () {
      this.isLoading = true
      const { id } = this.$route.params
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`)
        .then(res => {
          this.isLoading = false
          this.$router.push('/success')
        })
        .catch(err => {
          alert(err)
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
