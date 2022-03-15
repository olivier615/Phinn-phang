<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          @click.prevent="$emit('getProducts', pages.current_page - 1)"
          >上一頁</a
        >
      </li>
      <li
        class="page-item"
        v-for="page in pages.total_pages"
        :key="'page' + page"
        :class="{active: page === pages.current_page}"
      >
        <a class="page-link" href="#" @click.prevent="$emit('getProducts', page)">
          {{page}}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next}">
        <a
          class="page-link"
          href="#"
          @click.prevent="$emit('getProducts', pages.current_page + 1)"
          >下一頁</a
        >
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: ['pages']
}
</script>
