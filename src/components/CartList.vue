<template>
  <h4 class="text-center mb-4  text-secondary fw-bolder">訂單內容</h4>
  <table class="table">
    <thead class="text-secondary">
      <tr>
        <th>#</th>
        <th>品名</th>
        <th>數量</th>
        <th>售價</th>
      </tr>
    </thead>
    <tbody class="text-secondary">
      <tr v-for="(item, keys) in carts.carts" :key="item">
        <th>{{ keys + 1 }}</th>
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
        <td colspan="3" class="text-end">小計</td>
        <td class="text-end">{{ carts.total }}</td>
      </tr>
      <tr v-if=" carts.total - carts.final_total !== 0">
        <td colspan="3" class="text-end">折扣</td>
        <td class="text-end">{{ carts.total - carts.final_total}}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ carts.final_total }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  data () {
    return {
      carts: [],
      form: {
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
    getCarts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then(res => {
          console.log(res)
          this.carts = res.data.data
        })
        .catch(err => {
          alert(err)
        })
    }
  },
  props: ['newFinalTotal'],
  watch: {
    newFinalTotal () {
      this.carts.final_total = this.newFinalTotal
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>
