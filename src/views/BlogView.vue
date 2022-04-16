<template>
  <div class="container mt-80">
    <div class="row g-0 pt-6 justify-content-center">
      <div class="card col-md-7 border-0">
        <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>';">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/blogs">部落格</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              {{ article.title }}
            </li>
          </ol>
        </nav>
        <img :src="article.image" class="card-img-top" :alt="article.title">
        <!-- <h5 class="card-title text-secondary fw-bolder">{{ article.title }}</h5> -->
        <div class="card-body px-0">
          <article v-html="article.content" class="card-text text-secondary"></article>
          <div class="d-flex justify-content-center">
            <button class="btn btn-secondary mt-3" @click="this.$router.back(-1)">回上一頁</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      article: {},
      tagsList: []
    }
  },
  methods: {
    getArticle () {
      emitter.emit('page-loading', true)
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${id}`)
        .then(res => {
          this.article = res.data.article
          emitter.emit('page-loading', false)
        })
        .catch(err => {
          alert(err)
          emitter.emit('page-loading', false)
        })
    },
    getBlogs (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles/?page=${page}`)
        .then(res => {
          this.articles = res.data.articles
          this.pagination = res.data.pagination
          this.getTagsList()
        })
        .catch(err => {
          alert(err)
        })
    },
    getTagsList () {
      this.articles.forEach(item => {
        item.tags.forEach(tag => {
          if (this.tagsList.indexOf(tag) === -1) {
            this.tagsList.push(tag)
          }
        })
      })
    }
  },
  mounted () {
    window.scroll(0, 0)
    this.getArticle()
    this.getBlogs()
  }
}
</script>
