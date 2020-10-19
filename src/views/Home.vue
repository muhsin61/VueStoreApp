<template>
  <div class="home">
    <div v-for="item in $store.state.showedProduct" :key="item.id">
      <showProduct :msg="item" />
    </div>
    <div>
        <span @click="changePages('-')">-</span>
        <span>{{ $store.state.pageNumber + 1 }}</span>
        <span @click="changePages('+')">+</span>
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
  },
  methods:{
    changePages(pageNumber){
      if(pageNumber == "-" && this.$store.state.pageNumber > 0){
        this.$store.state.pageNumber--
      }
      if(pageNumber == "+" && this.$store.state.pageNumber < (this.$store.state.filtredData.length / 5 - 1)){
        this.$store.state.pageNumber++
      }
      this.$router.push("/?page=" + (this.$store.state.pageNumber + 1));
      this.$store.commit("pages")
    }
  }
}
</script>
<style scoped>
span {
  position: relative;
  display: inline-block;
  font-size: 50px;
}
</style>
