<template>
<Loading :active="isLoading" :z-index="1060"></Loading>
  <h2>後台-文章列表</h2>
  <div class="container">
    <div class="text-end mt-4">
      <router-link class="btn btn-primary"
      to="/admin/article">
        建立新的文章
      </router-link>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">名稱</th>
          <th width="60">標籤</th>
          <th width="60">作者</th>
          <th width="120">建立時間</th>
          <th width="120">發布</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.title">
          <td>{{article.title}}</td>
          <td>{{article.tag}}</td>
          <td>{{article.author}}</td>
          <td>{{new Date(article.create_at * 1000).toLocaleDateString()}}</td>
          <td>
            <span v-if="article.isPublic">啟用中</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <router-link :to="`/admin/article/${article.id}`"
              class="btn btn-outline-primary btn-sm"
              >
                編輯
              </router-link>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="OpenDeleteArticleModal (article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <pagination :pages="pagination" @get-products="getArticles"></pagination>
    <deleteArticle :article="article"
    ref="delArticleModal"
    @update="getArticles(pagination.current_page)"></deleteArticle>
  </div>
</template>

<script>
import pagination from '@/components/PageView.vue'
import deleteArticle from '@/components/DeleteArticle.vue'
export default {
  components: {
    pagination,
    deleteArticle
  },
  data () {
    return {
      isLoading: false,
      pagination: {},
      isNew: false,
      articles: [],
      article: {}
    }
  },
  methods: {
    getArticles (page = 1) {
      this.isLoading = true
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/articles/?page=${page}`)
        .then(res => {
          console.log(res)
          this.articles = res.data.articles
          this.pagination = res.data.pagination
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
          alert('無法取得文章列表')
        })
    },
    OpenDeleteArticleModal (article) {
      this.article = article
      this.$refs.delArticleModal.openModal()
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>
