<template>
  <div id="app">
    <div class="topbar"><h1>Fake Store card</h1></div>
    <div class="sidebar"><h1>This is sidebar</h1></div>
    <div v-if="$store.state.showProduct">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/card">Card</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <div v-else>
      <h1>{{ $store.state.productInfo.title }}</h1>
      <img :src="$store.state.productInfo.image" />
    </div>

    <router-view />
  </div>
</template>
<script>
export default {
  async created() {
    console.log(this.$route.path);
    await fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then(async (data) => {
        this.$store.state.storeAllData = data;
        this.$store.state.showStorewItems = this.$store.state.storeAllData;
        this.getRoute();
      });
  },
  watch: {
    $route() {
      this.getRoute();
    },
  },
  methods: {
    getRoute() {
      if (
        this.$store.state.storeAllData.find((item) => {
          if (item["title"].replaceAll(" ", "-") == this.$route.path.slice(1)) {
            this.$store.state.productInfo = item;
            console.log(item);
            return true;
          }
        })
      ) {
        this.$store.state.showProduct = false;
        console.log("test123");
      } else {
        this.$store.state.showProduct = true;
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
