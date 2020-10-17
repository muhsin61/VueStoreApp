<template>
  <div class="hello">
    <h5 @click="showProduct(msg)">
      {{ msg.title }}
    </h5>
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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  cursor: pointer;
}
</style>
