<template>
  <header>
    <div class="fixed-top" style="overFlow:hide">
      <div class="bg-primary py-2"></div>
      <div class="bg-info">
        <div class="d-flex justify-content-between p-0">
          <nav class="navbar navbar-expand-lg" style="width:100%">
            <div class="container-fluid d-flex justify-content-between">
              <router-link class="navbar-brand" to="/index">
              <span class="h5 me-2">鼻芳</span>
              <span class="text-headline h4">Phīnn-phang</span></router-link>
              <div class="d-flex">
                  <router-link class="nav-link" to="/cart">
                    <span class="bi bi-cart3 fs-4 position-relative">
                      <span v-if="carts?.length !== 0" class="position-absolute top-0 start-100
                      translate-middle badge rounded-pill bg-danger"
                      style="fontSize:0.5rem">{{ carts?.length }}</span>
                    </span>
                  </router-link>
                </div>
              <button ref="toggler" class="navbar-toggler p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="bi bi-list"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-2 ms-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <router-link class="nav-link" aria-current="page" to="/index" @click="closeNavbar">首頁</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/products" @click="closeNavbar">產品列表</router-link>
                  </li>
                  <li class="nav-item" @click="closeNavbar">
                    <router-link class="nav-link" to="/blogs" @click="closeNavbar">部落格</router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/login" @click="closeNavbar">登入後台</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      carts: []
    }
  },
  methods: {
    getCarts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then(res => {
          this.carts = res.data.data.carts
        })
        .catch(err => {
          alert(err)
        })
    },
    closeNavbar () {
      if (document.body.offsetWidth < 992) {
        this.$refs.toggler.click()
      }
    }
  },
  mounted () {
    this.getCarts()
    emitter.on('get-cart', () => {
      this.getCarts()
    })
  }
}
</script>
