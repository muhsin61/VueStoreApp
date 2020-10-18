<template>
  <div>
    <h1>This is cart page.</h1>
    <div v-for="cart in $store.state.cartProduct" :key="cart.id">
      <img :src="cart.image" />
      <p>{{ cart.title }}</p>
      <p>{{ cart.price }}₺</p>
      <div>
        <p @click="deleteProduct(cart)">Ürüni sepetten sil</p>
        <div>
          <span @click="changeProductNumber('-', cart)">-</span>
          <span>{{ cart.count }}</span>
          <span @click="changeProductNumber('+', cart)">+</span>
        </div>
      </div>
      <hr />
    </div>
    <div>
      <h3>Toplam</h3>
      <p>Ürün: {{ $store.state.cartNumber }}</p>
      <p>Tutar: {{ $store.state.cartPrice }} £</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "cart",
  methods: {
    changeProductNumber(change, cart) {
      const index = this.$store.state.cartProduct.findIndex(
        (product) => product.id === cart.id
      );
      if (index > -1) {
        if (change == "-" && cart.count > 1) {
          this.$store.state.cartProduct[index].count--;
        }
        if (change == "+") {
          this.$store.state.cartProduct[index].count++;
        }
      }
      this.$store.commit("calculate");
    },
    deleteProduct(cart) {
      const index = this.$store.state.cartProduct.findIndex(
        (product) => product.id === cart.id
      );
      this.$store.state.cartProduct.splice(index, 1);
      this.$store.commit("calculate");
    },
  },
};
</script>
<style scoped>
img {
  display: inline-block;
  width: 50px;
  height: auto;
}
span{
    display: inline-block;
    font-size: 50px;
}
</style>