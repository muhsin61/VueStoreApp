<template>
  <div class="hello">
    <img :src="msg.image" @click="showProduct(msg)" />
    <div>
      <h3 @click="showProduct(msg)">{{ msg.title }}</h3>
      <p @click="showProduct(msg)">{{ msg.description }}</p>
      <h5>{{ msg.price }} €</h5>
      <div>
        <span @click="changeCount('-')">-</span>
        <span>{{ count }}</span>
        <span @click="changeCount('+')">+</span>
        <button @click="addCart(msg)">Sepete ekle</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowProduct",
  props: {
    msg: Object,
  },
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    showProduct(msg) {
      this.$router.push(msg.title.replaceAll(" ", "-"));
    },
    changeCount(change) {
      if (change == "-" && this.count > 1) {
        this.count--;
      }
      if (change == "+") {
        this.count++;
      }
    },
    addCart(msg) {
      const index = this.$store.state.cartProduct.findIndex(
        (product) => product.id === msg.id
      );
      if (index > -1) {
        this.$store.state.cartProduct[index].count += this.count;
      } else {
        this.$store.state.cartProduct = [
          ...this.$store.state.cartProduct,
          { ...msg, count: this.count },
        ];
      }
      this.$store.commit("calculate")
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  border-bottom: 2px tomato solid;
}
img,
h3,
p {
  cursor: pointer;
}
img {
  position: relative;
  width: 200px;
  height: auto;
}
span {
  position: relative;
  display: inline-block;
  font-size: 50px;
}
</style>
