<template>
  <div class="img-01 py-6 mb-5 mt-56px"></div>
  <div class="container mt-56px">
    <div class="row g-0">
      <ul class="col-3 d-flex flex-column align-items-center">
        <li class="mb-2 text-secondary">全部文章</li>
        <li class="mb-2 text-secondary" v-for="tag in tagsList" :key="tag">{{tag}}</li>
      </ul>
      <div class="card col-9">
        <img :src="article.image" class="card-img-top" :alt="article.title">
        <div class="card-body">
          <h5 class="card-title text-secondary fw-bolder">{{article.title}}</h5>
          <p v-html="article.content" class="card-text text-secondary"></p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {},
      tagsList: []
    }
  },
  methods: {
    getArticle () {
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/article/${id}`)
        .then(res => {
          this.article = res.data.article
          console.log(this.article)
        })
        .catch(err => {
          alert(err)
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
