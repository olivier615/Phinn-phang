<template>
  <div class="container mt-80">
    <div class="row justify-content-center">
      <div class="col-6 mt-5">
        <h4 class="text-center mb-4 text-secondary fw-bolder border-bottom pb-3">完成付款</h4>
        <h5 class="text-secondary fw-bolder text-center">訂單編號</h5>
        <p class="text-secondary text-center border-bottom pb-3">{{ orderId }}</p>
        <p class="text-secondary text-center mb-4">感謝您的訂購，祝您有美好的一天！</p>
        <img src="../assets/image/success.jpg" alt="">
        <div class="d-flex justify-content-center mt-4">
          <router-link to="/index" class="btn btn-outline-secondary ms-1">
            回到首頁
          </router-link>
          <router-link to="/products" class="btn btn-primary ms-1">
            再去逛逛
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderId: '',
      isLoading: false
    }
  },
  mounted () {
    window.scroll(0, 0)
    this.orderId = sessionStorage.orderId
  }
}
</script>
