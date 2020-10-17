<template>
  <div id="app">
    <div class="topbar"><h1>Fake Store card</h1></div>
    <div class="sidebar"><h1>This is sidebar</h1></div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/card">Card</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
export default {
  created() { 
    console.log(this.$route.path)
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {this.$store.state.storeAllData = data});
    this.$store.state.showStorewItems = this.$store.state.storeAllData
  },
   watch: { 
     $route() {
      console.log(this.$route);
      console.log(this.$store.state.storeAllData);
    }
  }
}
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
