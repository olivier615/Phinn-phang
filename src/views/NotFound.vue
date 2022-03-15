<template>
  <h2><b>Oops！ </b>找不到頁面喔...</h2>
  <button class="btn btn-primary"
  @click.prevent="this.$router.back(-1)">回上一頁</button>
</template>
