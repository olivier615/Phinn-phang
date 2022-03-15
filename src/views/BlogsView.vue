<template>
  <div class="img-01 py-6 mb-5 mt-56px"></div>
  <div class="container">
    <div class="row flex-column flex-md-row">
        <ul class="col-12 col-md-3 d-flex flex-column align-items-center">
          <li class="mb-2 text-secondary">全部文章</li>
          <li class="mb-2 text-secondary" v-for="tag in tagsList" :key="tag">{{tag}}</li>
        </ul>
      <div class="card-group col-md-9 col-12">
        <div v-for="article in articles" :key="article.create_at">
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-6">
                <img :src="article.image" class="img-fluid" :alt="article.title">
              </div>
              <div class="col-md-5 offset-1">
                <div class="card-body">
                  <h5 class="card-title text-secondary fw-bolder">{{article.title}}</h5>
                  <p class="card-text text-secondary">{{article.description}}</p>
                  <router-link :to="`/blog/${article.id}`">閱讀更多</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-md-end justify-content-center my-4">
        <pagination :pages="pagination" @get-products="getBlogs"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/PageView.vue'
export default {
  components: {
    pagination
  },
  data () {
    return {
      articles: [],
      pagination: {},
      tagsList: []
    }
  },
  methods: {
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
    this.getBlogs()
  }
}
</script>
