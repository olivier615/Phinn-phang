<template>
<Loading :active="isLoading" :z-index="1060"></Loading>
  <h2>新增/編輯優惠券</h2>
  <div class="container">
    <div class="row">
      <div class="bg-dark text-white p-2 mb-3">
        <h5 class="modal-title">
          <span v-if="isNew">新增產品</span>
          <span v-else>編輯產品</span>
        </h5>
      </div>
      <form @submit.prevent="updateCoupon">
        <div class="mb-3">
          <label for="couponName" class="form-label">優惠券名稱</label>
          <input
          v-model="coupon.title"
            type="text"
            class="form-control"
            id="couponName"/>
        </div>
        <div class="mb-3">
          <label for="couponPercent" class="form-label">優惠券折扣</label>
          <input
          v-model="coupon.percent"
            type="number"
            class="form-control"
            id="couponPercent"
          />
        </div>
        <div class="mb-3">
          <label for="couponCode" class="form-label">優惠券折扣碼</label>
          <input
          v-model="coupon.code"
            type="text"
            class="form-control"
            id="couponCode"
          />
        </div>
        <div class="mb-3">
          <label for="due_date" class="form-label">優惠券期限</label>
          <input
            v-model="date"
            type="date"
            class="form-control"
            id="due_date"
          />
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" :checked="coupon.is_enabled"
          v-model="changeBoolean"
          id="is_enabled" />
          <label class="form-check-label" for="is_enabled">是否啟用</label>
        </div>
        <div class="text-end">
        <router-link class="btn btn-outline-secondary me-2" to="/admin/coupons">取消</router-link>
        <button type="submit" class="btn btn-primary">確認</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      isNew: false,
      date: '',
      changeBoolean: false,
      coupon: {
        title: '',
        is_enabled: 0,
        percent: 0,
        due_date: 0,
        code: ''
      }
    }
  },
  watch: {
    changeBoolean () {
      if (this.changeBoolean) {
        this.coupon.is_enabled = 1
      } else {
        this.coupon.is_enabled = 0
      }
    },
    date () {
      this.coupon.due_date = new Date(this.date).getTime() / 1000
    }
  },
  methods: {
    updateCoupon () {
      this.isLoading = true
      if (this.isNew) {
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon`,
          { data: this.coupon })
          .then(res => {
            alert('優惠券已新增')
            this.isLoading = false
            this.$router.push('/admin/coupons')
          })
          .catch((err) => {
            console.log(err.message)
            this.isLoading = false
          })
      } else {
        const { id } = this.$route.params
        this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupon/${id}`,
          { data: this.coupon })
          .then(res => {
            alert('優惠券已更新')
            this.isLoading = false
            this.$router.push('/admin/coupons')
          })
          .catch(err => {
            console.log(err.message)
            this.isLoading = false
          })
      }
    },
    getCoupon () {
      this.isLoading = true
      const { id } = this.$route.params
      if (id === undefined) {
        this.isNew = true
        this.isLoading = false
      } else {
        this.isNew = false
        this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons`)
          .then(res => {
            const couponArr = res.data.coupons.filter(item => {
              return item.id === id
            })
            this.coupon = couponArr[0]
            const changeDate = new Date(this.coupon.due_date * 1000)
            const year = changeDate.getFullYear()
            let month = changeDate.getMonth() + 1
            let day = changeDate.getDate()
            // 若月份是 1~9 就補 0
            if (month < 10) {
              month = `0${month}`
            }
            // 若日期是 1 ~ 9 那就補 0
            if (day < 10) {
              day = `0${day}`
            }
            this.date = `${year}-${month}-${day}`
            this.isLoading = false
          })
          .catch(() => {
            console.log('無法取得優惠券資料')
            this.isLoading = false
          })
      }
    }
  },
  mounted () {
    this.getCoupon()
  }
}
</script>
