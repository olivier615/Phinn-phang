<template>
  <h2>後台-優惠券列表</h2>
  <Loading :active="isLoading" :z-index="1060"></Loading>
  <div class="container">
    <div class="text-end mt-4">
      <router-link class="btn btn-primary"
      to="/admin/coupon">
        建立新的優惠券
      </router-link>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">名稱</th>
          <th width="60">啟用</th>
          <th width="60">折扣</th>
          <th width="120">期限</th>
          <th width="120">優惠碼</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="coupon in coupons" :key="coupon.id">
          <td>{{coupon.title}}</td>
          <td>
            <span v-if="coupon.is_enabled === 1">啟用中</span>
            <span v-else>未啟用</span>
          </td>
          <td>{{coupon.percent}}</td>
          <td>{{new Date(coupon.due_date * 1000).toLocaleDateString()}}</td>
          <td>
            {{coupon.code}}
          </td>
          <td>
            <div class="btn-group">
              <router-link :to="`/admin/coupon/${coupon.id}`"
              class="btn btn-outline-primary btn-sm">
                編輯
              </router-link>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="OpenDeleteCouponModal(coupon)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <pagination :pages="pagination" @get-products="getCoupons"></pagination>
  </div>
  <deleteCoupon :coupon="coupon"
    ref="delCouponModal"
    @update="getCoupons(pagination.current_page)"
  ></deleteCoupon>
</template>

<script>
import pagination from '@/components/PageView.vue'
import deleteCoupon from '@/components/DeleteCoupon.vue'
export default {
  components: {
    pagination,
    deleteCoupon
  },
  data () {
    return {
      isLoading: false,
      pagination: {},
      isNew: false,
      coupons: [],
      coupon: {}
    }
  },
  methods: {
    getCoupons (page = 1) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/coupons/?page=${page}`)
        .then(res => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
          alert('無法取得優惠券列表')
        })
    },
    OpenDeleteCouponModal (coupon) {
      this.coupon = coupon
      this.$refs.delCouponModal.openModal()
    }
  },
  mounted () {
    this.getCoupons()
  }
}
</script>
