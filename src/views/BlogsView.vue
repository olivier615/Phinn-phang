<template>
  <div class="img-01 py-6 mb-5 mt-80 img-banner-BlogsView img-banner" />
  <div class="container">
    <div class="row">
        <div class="col-12 col-md-3">
          <a class="mb-2 text-primary" href="#" @click.prevent="getBlogs">全部文章</a>
          <div class="mb-1 text-secondary"><small>文章標籤</small></div>
          <div class="d-flex flex-wrap">
            <a class="mb-2 text-primary border border-primary px-1 me-1"
            v-for="tag in tagsList" :key="tag" href="#"
            @click.prevent="selectTag(tag)">{{ tag }}</a>
          </div>
        </div>
        <div class="card-group col-md-9 col-12">
          <div v-for="article in searchArticles" :key="article.create_at">
            <div class="card mb-3 border-0">
              <router-link class="row g-0" :to="`/blog/${article.id}`">
                <div class="col-md-6">
                  <img :src="article.image" class="img-fluid" :alt="article.title">
                </div>
                <div class="col-md-6">
                  <div class="card-body ps-0 ps-md-3 pt-3 pt-md-0">
                    <h5 class="card-title text-secondary fw-bolder">{{article.title}}</h5>
                    <p class="card-text text-secondary">{{article.description}}</p>
                    <router-link :to="`/blog/${article.id}`">閱讀更多</router-link>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      <div class="d-flex justify-content-md-end justify-content-center my-4">
        <pagination :pages="pagination" @get-products="getBlogs" />
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/PageView.vue'
import emitter from '@/libs/emitter.js'
export default {
  components: {
    pagination
  },
  data () {
    return {
      articles: [],
      pagination: {},
      tagsList: [],
      tag: ''
    }
  },
  methods: {
    getBlogs (page = 1) {
      emitter.emit('page-loading', true)
      this.tag = ''
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles/?page=${page}`)
        .then(res => {
          this.articles = res.data.articles
          this.pagination = res.data.pagination
          this.getTagsList()
          emitter.emit('page-loading', false)
        })
        .catch(err => {
          alert(err)
          emitter.emit('page-loading', false)
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
    },
    selectTag (tag) {
      this.tag = tag
    }
  },
  computed: {
    searchArticles () {
      const searchArticles = this.articles.filter(item => {
        return item.tags.toString().match(this.tag)
      })
      return searchArticles
    }
  },
  mounted () {
    window.scroll(0, 0)
    this.getBlogs()
  }
}
</script>

<style lang="scss">
.img-banner-BlogsView{
  background-image: url(../assets/image/pageBanner/banner-blogs.jpg);
  background-position: center left ;
}
</style>
