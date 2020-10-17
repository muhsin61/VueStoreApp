<template>
  <div class="hello">
    <img :src="msg.image" @click="showProduct(msg)" >
    <div>
      <h3 @click="showProduct(msg)">{{ msg.title }}</h3>
      <p @click="showProduct(msg)">{{msg.description}}</p>
      <h5>{{msg.price}} €</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowProduct",
  props: {
    msg: Object,
  },
  methods: {
    showProduct(msg) {
      this.$router.push(msg.title.replaceAll(" ", "-"));
      console.log(msg);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  display: flex;
  border-bottom: 2px tomato solid;
}
img,h3,p{
  cursor: pointer;
}
img{
  position: relative;
  width: 200px;
  height: auto;
}
</style>
