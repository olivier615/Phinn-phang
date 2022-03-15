<template>
  <ToastMessages></ToastMessages>
  <NavBar></NavBar>
  <router-view />
  <footerView></footerView>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ToastMessages from '@/components/MessageToasts.vue'
import footerView from '@/components/FooterView.vue'
export default {
  components: {
    NavBar,
    ToastMessages,
    footerView
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
</style>
