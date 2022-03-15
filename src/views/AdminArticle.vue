<template>
  <!-- <Loading :active="isLoading" :z-index="1060"></Loading> -->
  <h2>新增/編輯文章</h2>
  <div class="container">
      <div class="bg-dark text-white p-2 mb-3">
        <h5 class="modal-title">
          <span v-if="isNew">新增文章</span>
          <span v-else>編輯文章</span>
        </h5>
      </div>
      <form @submit.prevent="updateArticle">
        <div class="row">
          <div class="mb-3 col-sm-4">
            <label for="articleImage" class="form-label">圖片</label>
            <input type="file" class="form-control mb-3" id="file"
            placeholder="選擇圖片上傳" @change="upload">
            <input type="text" class="form-control mb-2"
            placeholder="請輸入圖片連結" v-model="article.image">
            <img class="img-fluid" :src="article.image">
          </div>
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="articleTitle" class="form-label">標題</label>
              <input
                v-model="article.title"
                type="text"
                class="form-control"
                id="articleTitle"/>
            </div>
            <div class="mb-3">
              <label for="articleAuthor" class="form-label">作者</label>
              <input
                v-model="article.author"
                type="text"
                class="form-control"
                id="articleAuthor"/>
            </div>
            <div class="mb-3">
              <label for="articleDescription" class="form-label">概要</label>
              <input
                v-model="article.description"
                type="text"
                class="form-control"
                id="articleDescription"/>
            </div>
            <div class="mb-3">
              <label for="articleTag" class="form-label">標籤</label>
              <button class="btn btn-outline-primary btn-sm ms-3 mb-3"
              @click="addNewTag" type="button">新增標籤</button>
              <div class="row">
              <div class="col-3 mb-2" v-for="(tag, key) in article.tags" :key="key">
                <div class="input-group input-group-sm">
                  <input
                    type="text"
                    class="form-control form-control"
                    id="tag"
                    placeholder="請輸入標籤"
                    v-model="article.tags[key]"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    @click="deleteTag(key)"
                  >
                    <i class="bi bi-x"></i>
                  </button>
                </div>
              </div>
              </div>
            </div>
            <div class="mb-3 form-check">
              <input type="checkbox" class="form-check-input"
              v-model="article.isPublic"
              id="isPublic" />
              <label class="form-check-label" for="isPublic">是否啟用</label>
            </div>
            <div class="mb-3">
              <ckeditor
                :editor="editor"
                :config="editorConfig"
                v-model="article.content"
              ></ckeditor>
            </div>
          </div>
        </div>
        <div class="text-end">
              <router-link class="btn btn-outline-secondary me-2" to="/admin/articles">取消</router-link>
              <button type="submit" class="btn btn-primary">確認</button>
            </div>
      </form>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
let fileInput = null
export default {
  data () {
    return {
      // isLoading: false,
      isNew: false,
      article: {
        tags: [],
        image: ''
      },
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link']
      }
    }
  },
  methods: {
    updateArticle () {
      this.isLoading = true
      if (this.isNew) {
        this.article.create_at = Math.floor(Date.now() / 1000)
        this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article`, {
          data: this.article
        })
          .then(res => {
            alert(res.data.message)
            this.isLoading = false
            this.$router.push('/admin/articles')
          })
          .catch(err => {
            this.isLoading = false
            alert(err)
          })
      } else {
        const { id } = this.$route.params
        this.$http.put(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`, {
          data: this.article
        })
          .then(res => {
            alert(res.data.message)
            this.isLoading = false
            this.$router.push('/admin/articles')
          })
          .catch(err => {
            this.isLoading = false
            alert(err)
          })
      }
    },
    getArticle () {
      this.isLoading = true
      const { id } = this.$route.params
      if (id === undefined) {
        this.isNew = true
        this.isLoading = false
      } else {
        this.isNew = false
        this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/article/${id}`)
          .then(res => {
            this.article = res.data.article
            this.isLoading = false
          })
          .catch(() => {
            this.isLoading = false
            alert('無法取得文章')
          })
      }
    },
    upload () {
      this.isLoading = true
      const file = fileInput.files[0] // 使用 console.dir 找到 fileInput.files 類陣列的位置
      console.log(file)
      const formData = new FormData() // 建立 api 上傳資料 所需格式
      formData.append('file-to-upload', file)
      this.$http.post(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/upload/`, formData)
        .then(res => {
          console.log(res.data.imageUrl)
          this.article.image = res.data.imageUrl
          this.isLoading = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    addNewTag () {
      this.article.tags.push('')
      console.log(this.article.tags)
    },
    deleteTag (key) {
      this.article.tags.splice(key, 1)
    }
  },
  mounted () {
    this.getArticle()
    fileInput = document.querySelector('#file')
  }
}
</script>

<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
