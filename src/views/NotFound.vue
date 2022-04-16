<template>
  <div class="container-fluid bg-sp">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-5 bg-oops d-flex flex-column align-items-center" style="height:100vh">
        <h1 class="h3 mb-3 font-weight-normal text-center text-light my-6"><b>Oops！ </b>找不到頁面喔...</h1>
          <button class="btn btn-secondary w-50 mt-4"
            @click.prevent="$router.back(-1)">回上一頁</button>
      </div>
    </div>
  </div>
</template>
