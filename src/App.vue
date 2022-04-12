<template>
  <router-view/>
</template>

<style lang="scss">
@import './assets/stylesheets/all.scss';
</style>

<script>
import emitter from '@/libs/emitter.js'
export default {
  provide () {
    return {
      emitter
    }
  }
}
</script>
