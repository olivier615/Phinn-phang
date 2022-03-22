<template>
<div v-show="pageLoading"
class="pageLoading position-fixed">
  <div class="sk-cube-grid position-absolute top-50 start-50 translate-middle">
    <div class="sk-cube sk-cube1"></div>
    <div class="sk-cube sk-cube2"></div>
    <div class="sk-cube sk-cube3"></div>
    <div class="sk-cube sk-cube4"></div>
    <div class="sk-cube sk-cube5"></div>
    <div class="sk-cube sk-cube6"></div>
    <div class="sk-cube sk-cube7"></div>
    <div class="sk-cube sk-cube8"></div>
    <div class="sk-cube sk-cube9"></div>
  </div>
</div>
<div>
  <ToastMessages></ToastMessages>
  <NavBar></NavBar>
  <router-view />
  <footerView></footerView>
</div>
</template>

<script>
import emitter from '@/libs/emitter.js'
import NavBar from '@/components/NavBar.vue'
import ToastMessages from '@/components/MessageToasts.vue'
import footerView from '@/components/FooterView.vue'
export default {
  components: {
    NavBar,
    ToastMessages,
    footerView
  },
  data () {
    return {
      pageLoading: true
    }
  },
  mounted () {
    emitter.on('page-loading', (state) => {
      this.pageLoading = state
    })
  }
}
</script>

<style lang="scss">
// 隱藏 input type="number" 的調整數量箭頭
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none }
  input[type=number] {
      -moz-appearance:textfield
  }
  .pageLoading{
  width: 100vw;
  height: 100vh;
  z-index: 6000;
  background-color: var(--bs-primary) ;
  opacity: .6;
}
</style>
