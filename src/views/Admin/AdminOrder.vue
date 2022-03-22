<template>
<Loading :active="isLoading" :z-index="1060"></Loading>
  <h2>訂單詳情</h2>
  <div class="container">
    <div class="text-end">
      <button class="btn btn-primary" @click="updateOrder">更新訂單</button>
    </div>
    <h3>付款狀態</h3>
    <div class="form-check mb-3">
      <input class="form-check-input" type="checkbox" value="" id="is_paid"
      v-model="order.is_paid">
      <label class="form-check-label" for="is_paid">
        已付款
      </label>
    </div>
    <h3>訂購者資料</h3>
      <FormTemp v-slot="{ errors }">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <FieldTemp
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="order.user.email"
          ></FieldTemp>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">姓名</label>
          <FieldTemp
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="order.user.name"
          ></FieldTemp>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">電話</label>
          <FieldTemp
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8"
            v-model="order.user.tel"
          ></FieldTemp>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">地址</label>
          <FieldTemp
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="order.user.address"
          ></FieldTemp>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="15" rows="5"
          v-model="order.message"></textarea>
        </div>
      </FormTemp>
    <h3>訂單內容</h3>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in order.products" :key="item.id">
          <tr>
            <td>
            </td>
            <td>
              {{item.product.title}}
              <div class="text-success">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <!-- <input min="1" type="number" class="form-control" v-model=""> -->
                  <span class="input-group-text" id="basic-addon2">{{item.qty}}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <!-- <small class="text-success">折扣價：</small> -->
              {{item.total}}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{order.total}}</td>
        </tr>
        <tr>
          <!-- <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ }}</td> -->
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
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
    getOrder () {
      this.isLoading = true
      const { id } = this.$route.params
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/orders`
        )
        .then((res) => {
          const orderArr = res.data.orders.filter(item => {
            return item.id === id
          })
          this.order = orderArr[0]
          this.isLoading = false
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
        })
    },
    updateOrder () {
      this.isLoading = true
      const data = this.order
      const { id } = this.$route.params
      this.$http.put(
        `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/order/${id}`,
        { data }
      )
        .then((res) => {
          alert(res.data.message)
          this.isLoading = false
          this.$router.push('/admin/orders')
        })
        .catch((err) => {
          console.dir(err)
          this.isLoading = false
        })
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
