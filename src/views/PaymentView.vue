<template>
<div class="img-01 py-6 mt-56px mb-5"></div>
  <div class="container">
    <div class="row justify-content-center flex-md-row flex-column">
      <div class="col-md-5 col-12">
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
      <div class="col-md-4 col-12">
        <h4 class="text-center text-secondary fw-bolder mb-4">支付方式</h4>
          <div class="d-flex flex-column justify-content-center">
            <select class="form-select form-select-md mb-3" aria-label=".form-select-sm"
            v-model="payment">
              <option selected disabled>請選擇支付方式</option>
              <option value="信用卡">信用卡付款</option>
              <option value="銀行轉帳">銀行轉帳</option>
              <option value="貨到付款">貨到付款</option>
            </select>
            <button class="btn btn-primary mt-3"
            :disabled="payment === '請選擇支付方式'"
            @click="orderPay">確定支付</button>
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
      payment: '請選擇支付方式'
    }
  },
  methods: {
    getOrder () {
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/orders`)
        .then(res => {
          this.orders = res.data.orders
          this.order = this.orders.filter(item => item.id === id)
          this.order = this.order[0]
          console.log(this.order)
        })
        .catch(err => {
          alert(err)
        })
    },
    orderPay () {
      const { id } = this.$route.params
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/pay/${id}`)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          alert(err)
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
