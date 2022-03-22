<template>
  <div class="home container mt-56px">
    <div class="row justify-content-center mt-4 flex-md-row flex-column">
      <div class="col-md-5 col-12 mt-5">
        <CartList :new-final-total="newFinalTotal"></CartList>
        <h4 class="text-center mt-5 text-secondary fw-bolder mb-4">使用優惠券</h4>
        <div class="input-group my-3">
          <input type="text" class="form-control" placeholder="請輸入優惠券代碼"
          aria-label="couponCode" aria-describedby="couponCode"
          v-model="couponCode">
          <button class="btn btn-outline-primary" type="button" id="couponCode"
          @click="submitCouponCode">
            <div v-if="isLoading === true">
              <span class="spinner-border spinner-border-sm fs-5 me-2" role="status"></span>
              <span>請稍後...</span>
            </div>
            <span v-else>使用優惠券</span>
          </button>
        </div>
        <div v-if="couponMassage !== ''" class="alert alert-primary" role="alert">
          {{couponMassage}}
        </div>
      </div>
        <div class="col-md-4 col-12 mt-5">
          <h4 class="text-center mb-4 text-secondary fw-bolder">聯絡資訊</h4>
          <p class="text-secondary"><small>標註</small><span class="text-danger"> * </span><small>為必須填寫</small></p>
        <FormTemp v-slot="{ errors, validate }" v-on:submit="onSubmit" class="text-secondary">
          <!-- {{ errors }} {{ values }} -->
          <div class="mb-3">
            <label for="email" class="form-label">Email
              <span class="text-danger">*</span>
            </label>
            <FieldTemp
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="form.user.email"
            ></FieldTemp>
            <error-message name="email" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">姓名
              <span class="text-danger">*</span>
            </label>
            <FieldTemp
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></FieldTemp>
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">電話
              <span class="text-danger">*</span>
            </label>
            <FieldTemp
              id="tel"
              name="電話"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required|min:8"
              v-model="form.user.tel"
            ></FieldTemp>
            <error-message name="電話" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">地址
              <span class="text-danger">*</span>
            </label>
            <FieldTemp
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></FieldTemp>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>
          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea id="message" class="form-control" cols="15" rows="5"
            v-model="form.message"></textarea>
          </div>
          <div class="text-center text-md-end">
            <button
              class="btn btn-outline-secondary me-2"
              @click="backToPreviousPage">
              回上一頁
            </button>
            <button :disabled="Object.keys(errors).length > 0|| carts.carts?.length === 0"
              class="btn btn-primary"
              type="submit"
              @click="validate">
              <div v-if="isLoading === true">
              <span class="spinner-border spinner-border-sm fs-5 me-2" role="status"></span>
              <span>請稍後...</span>
            </div>
            <span v-else>送出訂單</span>
            </button>
          </div>
        </FormTemp>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
import CartList from '@/components/CartList.vue'
export default {
  components: {
    CartList
  },
  data () {
    return {
      isLoading: '',
      carts: [],
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      couponCode: '',
      couponMassage: '',
      newFinalTotal: 0
    }
  },
  methods: {
    onSubmit () {
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
        { data: this.form }
      )
        .then(res => {
          emitter.emit('get-cart')
          const orderId = res.data.orderId
          this.$router.push(`/payment/${orderId}`)
          this.isLoading = ''
        })
        .catch(err => {
          alert(err)
          this.isLoading = ''
        })
    },
    getCarts () {
      emitter.emit('page-loading', true)
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then(res => {
          this.carts = res.data.data
          this.isLoading = ''
          emitter.emit('page-loading', false)
        })
        .catch(err => {
          alert(err)
          this.isLoading = ''
          emitter.emit('page-loading', false)
        })
    },
    backToPreviousPage () {
      this.$router.back(-1)
    },
    submitCouponCode () {
      this.isLoading = true
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/coupon`,
        {
          data: {
            code: this.couponCode
          }
        }
      )
        .then(res => {
          console.log(res)
          this.newFinalTotal = res.data.data.final_total
          this.couponMassage = res.data.message
          emitter.emit('get-cart')
          this.getCarts()
          this.isLoading = ''
        })
        .catch(err => {
          this.$httpMessageState(err.response, '輸入優惠券')
          this.isLoading = ''
        })
    }
  },
  mounted () {
    this.getCarts()
  }
}
</script>

<style lang="scss">
.table > :not(:first-child) {
  border-top:   0 !important;
}
</style>
