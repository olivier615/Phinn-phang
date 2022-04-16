<template>
  <div class="container-fluid bg-sp">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-5 bg-login" style="height:100vh">
        <h1 class="h3 mb-3 font-weight-normal text-center text-light my-6">登入後台</h1>
        <form id="form" class="form-signin">
          <div class="form-floating mb-3">
            <input
              v-model="user.username"
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              v-model="user.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <div class="d-flex mt-3">
            <button type="button" class="btn btn-secondary btn-lg w-50 me-1"
            @click="backToPreviousPage">回上一頁</button>
            <button
              @click.prevent="login"
              class="btn btn-lg btn-primary w-50 ms-1"
              type="submit"
            >
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      url: process.env.VUE_APP_API,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const api = `${this.url}/admin/signin`
      this.$http
        .post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data
          // 寫入 cookie token
          // expires 設置有效時間
          document.cookie = `otisToken=${token};expires=${new Date(
            expired
          )}; path=/`
          this.$router.push('/admin')
        })
        .catch(() => {
          alert('登入失敗')
        })
    },
    backToPreviousPage () {
      this.$router.back(-1)
    }
  }
}
</script>
