<template>
  <div class="bg mt-80 d-flex align-items-md-center align-items-start">
      <div class="container d-flex justify-content-md-start justify-content-center mt-6 mt-md-0">
        <div class="banner-bg d-inline-block p-3 ms-md-7">
          <h2 class="text-primary fw-bolder">享受生活美好滋味</h2>
          <p class="text-secondary fw-bolder">用味蕾探索世界<br>跟著香料芬芳感受大自然最棒的禮物</p>
          <router-link to="/products" type="button" class="btn btn-primary" style="width:100%">選購香料</router-link>
        </div>
      </div>
  </div>
  <div class="container my-6">
    <h4 class="mb-4 border-start border-primary ps-2 border-3 fw-bolder text-secondary">最新上市</h4>
      <div class="card mb-3 border-0 bg-none">
        <div class="row g-0 flex-column-reverse flex-md-row">
          <div class="col-md-5 col-12 d-flex align-items-center">
            <div class="card-body d-flex flex-column  ps-0">
              <h5 class="card-title text-primary fw-bolder">家常風味研磨香料罐系列</h5>
              <p class="card-text text-secondary">
                家常風味系列以台式料理為基礎，精選多種單品香料及香料組合研磨罐。無論是家常滷味、海鮮料理或年節大菜，
                家常風味系列都能為您的料理增添更多層次的風味
              </p>
              <div class="d-flex justify-content-md-start justify-content-center">
                <router-link to="/products" class="btn btn-outline-primary">選購商品</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-6 offset-md-1">
            <img src="../assets/image/index/NewArrival/NewArrival-01.jpg" class="img-fluid" alt="">
          </div>
        </div>
      </div>
      <div class="card mb-3 border-0">
        <div class="row g-0 flex-column-reverse flex-md-row">
          <div class="col-md-5 col-12 d-flex align-items-center">
            <div class="card-body d-flex flex-column ps-0">
              <h5 class="card-title text-primary fw-bolder">冬日飲品香料組合包系列</h5>
              <p class="card-text text-secondary">
                與親朋好友在冬日中相聚時，用溫暖的香氣為回憶增添色彩，無論是熱紅酒、香料奶茶或是
                不含酒精及咖啡因的果汁飲品，冬日飲品香料組合都有適合您的選項
              </p>
              <div class="d-flex justify-content-md-start justify-content-center">
                <router-link to="/products" class="btn btn-outline-primary"
                >選購商品</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-6  offset-md-1">
            <img src="../assets/image/index/NewArrival/NewArrival-02.jpg" class="img-fluid" alt="">
          </div>
        </div>
      </div>
  </div>
  <div class="bg2 d-flex align-items-center justify-content-center flex-column">
    <h3 class="text-secondary banner-bg px-4 py-2 text-center">香料用來襯托<br>提升食材的風味</h3>
  </div>
  <div class="container mt-7">
    <div class="row g-0 justify-content-center">
      <div class="card mb-3 col-md-8 col-12 border-0">
          <h4 class="card-title border-start border-primary ps-2 border-3 fw-bolder text-secondary">
            香料如何影響我們
          </h4>
        <img src="../assets/image/index/intro/intro-1.jpg" style="height:300px" class="card-img-top" alt="">
        <div class="card-body px-0">
          <p class="card-text mb-2 text-secondary">香料就存在於我們的生活中，香料是無數料理的精華所在，它不但強化了菜餚本身的味道，還能賦予我們原本熟悉的食物全新的風味與香氣，刺激用餐者的所有感官。</p>
          <p class="card-text text-secondary">香料入菜不只是現磨幾下黑胡椒粉或是加入幾瓣大蒜，鼻芳團隊希望提供更多的香料和知識使用者帶來更具想像力的飲食體驗，滿足生活情趣，進而營造令人稱羨的優雅品味。</p>
          <div class="d-flex justify-content-between mb-2 row">
            <div class="d-flex flex-column justify-content-center px-md-2 col-md-6 col-12">
              <h5 class="card-title border-start border-primary ps-2 border-3 mt-4 fw-bolder text-secondary">
                捉摸不定的香氣
              </h5>
              <p class="card-text text-secondary mb-2 mb-sm-0">不同的香料需要不一樣的處理方法，黑胡椒研磨成粉後，其氣味分子會立即揮發至空氣中，不用幾分鐘就消散殆盡。而八角的外殼堅硬，需要長時間的熬煮，才能得到其溫暖強烈的香氣</p>
            </div>
            <img src="../assets/image/index/intro/intro-2.jpg" class="col-md-6 col-12" alt="">
          </div>
          <div class="d-flex justify-content-between mb-2 row">
            <img src="../assets/image/index/intro/intro-3.jpg" class="col-md-6 col-12
            order-2 order-md-1" alt="">
            <div class="d-flex flex-column justify-content-center px-md-2 col-md-6 col-12
            order-1 order-md-2">
              <h5 class="card-title border-start border-primary ps-2 border-3 mt-4 fw-bolder text-secondary">
                難以定義的香氣
              </h5>
              <p class="card-text text-secondary mb-2 mb-sm-0">多數的香料都有著極其多樣複雜的氣味分子組成，以香草為例，雖然有 97% 以上的香草食品都是使用人工香草醛來獲得香草的醇厚香氣，但香草有超過 250 種以上已知的香味分子，是人工香草醛無法比擬的</p>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-2 row">
            <div class="d-flex flex-column justify-content-center px-md-2 col-md-6 col-12">
              <h5 class="card-title border-start border-primary ps-2 border-3 mt-4 fw-bolder text-secondary">
                無法抗拒的香氣
              </h5>
              <p class="card-text text-secondary mb-2 mb-sm-0">許多香料除了其本身的風味，有著更多意想不到的功效，肉桂本身嘗起來並不甜，但能讓食材吃起來更甜，因此其非常適合用在甜品或是烘焙上</p>
            </div>
            <img src="../assets/image/index/intro/intro-4.jpg" class="col-md-6 col-12" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg3 d-flex align-items-center justify-content-center mt-7">
    <h3 class="text-secondary banner-bg px-4 py-2 text-center">香料就像配角<br>突顯主角的魅力</h3>
  </div>
  <div class="container my-6">
    <h4 class="mb-4 border-start border-primary ps-2 border-3 fw-bolder text-secondary">最新文章</h4>
    <div class="mb-3" v-for="article in articles" :key="article.title">
      <div class="card border-0">
        <div class="row g-0">
          <div class="col-md-6">
            <img :src="article.image" class="img-fluid" :alt="article.title">
          </div>
          <div class="col-md-5 d-flex align-items-center offset-md-1">
            <div class="card-body d-flex flex-column ps-0">
              <h5 class="card-title fw-bolder text-primary">{{ article.title }}</h5>
              <p class="mb-1"><small>{{ new Date(article.create_at * 1000).toLocaleDateString() }}</small></p>
              <p class="card-text text-secondary">
                {{article.description}}
              </p>
              <div class="d-flex justify-content-md-start justify-content-center">
                <router-link :to="`/blog/${article.id}`" class="btn btn-outline-primary">查看更多</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg4 d-flex align-items-center justify-content-center mt-7">
    <h3 class="text-secondary banner-bg px-4 py-2 text-center">香料就是魔法<br>滋養我們的靈魂</h3>
  </div>
  <div class="container my-7">
    <div class="row g-0 justify-content-center">
      <div class="card mb-3 col-md-8 col-12 border-0">
          <h4 class="card-title border-start border-primary ps-2 border-3 fw-bolder text-secondary">關於鼻芳
            <span class="text-headline"> Phīnn-phang</span></h4>
        <img src="../assets/image/index/about.jpg" style="height:300px" class="card-img-top" alt="...">
        <div class="card-body px-0">
          <p class="card-text mb-2 text-secondary">「鼻香」一詞來自台語，常用於向他人展示好東西或透露出令人羨慕的好消息； 例如：提出來予你鼻芳一下。</p>
          <p class="card-text text-secondary">鼻芳團隊希望以香料為使用者營造更具想像力的味覺體驗，滿足生活情趣，進而使周遭的人投以羨慕的眼光。</p>
          <h5 class="card-title border-start border-primary ps-2 border-3 mt-4 fw-bolder text-secondary">
            <span class="text-headline">Phīnn-phang</span> 怎麼念？
            </h5>
          <p class="card-text text-secondary">如果你不會台語，那就用中文叫我們「痞乓」吧！</p>
        </div>
      </div>
    </div>
  </div>
  <swiper />
  <div class="container mt-6">
    <div class="row">
      <div class="col-12 col-sm-6 col-md-4">
          <h4 class="mb-4 border-start border-primary ps-2 border-3 fw-bolder text-secondary">追蹤鼻芳</h4>
          <div class="d-flex flex-column justify-content-start" style="height:100%">
            <a class="btn btn-outline-primary fw-bolder fs-5 mb-2">
              <span class="bi bi-instagram fs-4 me-2"></span>
              <span>
                Instagram
              </span>
            </a>
            <a class="btn btn-outline-primary fw-bolder fs-5 mb-2">
              <span class="bi bi-twitter fs-4 me-2"></span>
              <span>
                Twitter
              </span>
            </a>
            <a class="btn btn-outline-primary fw-bolder fs-5 mb-2">
              <span class="bi bi-facebook fs-4 me-2"></span>
              <span>
                Facebook
              </span>
            </a>
          </div>
        </div>
      <div class="col-12 col-sm-6 col-md-4 mb-3 mb-sm-0">
        <img src="../assets/image/index/media/media-03.jpg" alt="">
      </div>
      <div class="col-4 d-none d-md-block">
        <img src="../assets/image/index/media/media-05.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
import swiper from '@/components/SwiperView.vue'
export default {
  components: {
    swiper
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {
    getBlogs (page = 1) {
      emitter.emit('page-loading', true)
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/articles/?page=${page}`)
        .then(res => {
          this.articles = res.data.articles
          this.articles.map((item, index) => index <= 2)
          emitter.emit('page-loading', false)
        })
        .catch(err => {
          alert(err)
          emitter.emit('page-loading', false)
        })
    }
  },
  mounted () {
    window.scroll(0, 0)
    this.getBlogs()
  }
}
</script>
