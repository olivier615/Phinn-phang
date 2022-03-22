<template>
  <div class="container mt-56px">
    <div class="row g-0 pt-6 justify-content-center">
      <div class="card col-md-7 border-0">
        <h5 class="card-title text-secondary fw-bolder">{{article.title}}</h5>
        <img :src="article.image" class="card-img-top" :alt="article.title">
        <div class="card-body px-0">
          <p v-html="article.content" class="card-text text-secondary"></p>
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
          console.log(res.data)
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
    this.getArticle()
    this.getBlogs()
  }
}
</script>
