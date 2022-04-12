<template>
  <div class="container mt-80">
    <div class="row justify-content-center flex-md-row flex-column">
      <div class="col-md-5 col-12 mt-5">
        <h4 class="text-center text-secondary fw-bolder">訂單編號</h4>
        <p class="text-center text-secondary">{{ order.id }}</p>
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
                <td class="text-end">{{ order.total }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      <div class="col-md-4 col-12 mt-5">
        <h4 class="text-center text-secondary fw-bolder mb-4">支付方式</h4>
        <div class="d-flex flex-column px-6">
          <div class="form-check border-secondary border mb-2 py-2"
          :class="{ 'bg-info': payment === '信用卡付款'}">
            <input v-model="payment" value="信用卡付款"
            class="form-check-input ms-6" type="radio" name="payment" id="creditCard">
            <label class="form-check-label ms-3" for="creditCard">
              信用卡付款
            </label>
          </div>
          <div class="form-check border-secondary border mb-2 py-2"
          :class="{ 'bg-info': payment === '銀行轉帳'}">
            <input v-model="payment" value="銀行轉帳"
            class="form-check-input ms-6" type="radio" name="payment" id="transfer">
            <label class="form-check-label ms-3" for="transfer">
              銀行轉帳
            </label>
          </div>
          <div class="form-check border-secondary border mb-2 py-2"
          :class="{ 'bg-info': payment === '貨到付款' }">
            <input v-model="payment" value="貨到付款"
            class="form-check-input ms-6" type="radio" name="payment" id="cashOnDelivery">
            <label class="form-check-label ms-3" for="cashOnDelivery">
              貨到付款
            </label>
          </div>
          <button class="btn btn-primary mt-3" type="button"
            :disabled="payment === '' || isLoading === true"
            @click="orderPay">
              <span v-if="isLoading === true" class="spinner-border spinner-border-sm me-2" role="status"></span>
              <span v-if="payment">確定支付</span>
              <span v-if="!payment">請選擇支付方式</span>
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
      payment: '',
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      this.isLoading = true
      const { id } = this.$route.params
      sessionStorage.setItem('orderId', id)
      console.log(sessionStorage)
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
    window.scroll(0, 0)
    this.getOrder()
  }
}
</script>
