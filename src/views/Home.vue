<template>
  <div class="home">
    <div v-for="item in $store.state.showStorewItems" :key="item.id">
      <showProduct :msg="item" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import showProduct from '@/components/ShowProduct.vue'

export default {
  name: 'Home',
  components: {
    showProduct
  }
}
</script>
