<template>
  <div id="app">
    <div class="topbar">
      <h1>Fake Store Cart</h1>
      <router-link to="/">Home</router-link> |
      <router-link to="/cart">Cart</router-link>
    </div>
    <div class="sidebar">
      <h1>This is sidebar</h1>
      <div v-for="check in $store.state.categoryList" :key="check">
        <input
          type="checkbox"
          :checked="$store.state.searchCategoryList[check.replaceAll(' ','')]"
          name="test"
          :id="check"
          @change="categoryChange($event)"
        /><label :for="check">{{ check }}</label>
      </div>
    </div>
    <div v-if="$store.state.showProduct"></div>
    <div v-else>
      <h1>{{ $store.state.productInfo.title }}</h1>
      <img :src="$store.state.productInfo.image" />
      <div>
        <h3>{{ $store.state.productInfo.title }}</h3>
        <p>{{ $store.state.productInfo.description }}</p>
        <h5>{{ $store.state.productInfo.price }} €</h5>
      </div>
    </div>
    <router-view />
    <div id="nav">
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>
<script>
export default {
  async created() {
    await fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then(async (data) => {
        this.$store.state.storeAllData = data;
        this.$store.commit("pages");
        this.getRoute();
      });

    this.$store.state.storeAllData.forEach((item) => {
      if (
        this.$store.state.categoryList.findIndex(
          (category) => category === item.category
        ) === -1
      ) {
        this.$store.state.categoryList.push(item.category);
        this.$store.state.searchCategoryList[item.category.replaceAll(" ", "")] = false;
      }
    });
    console.log(this.$store.state.searchCategoryList)
    if (JSON.parse(localStorage.getItem("cart")).length) {
      this.$store.state.cartProduct = JSON.parse(localStorage.getItem("cart"));
      this.$store.commit("calculate");
    }
    if (this.$route.path == "/" && !this.$route.query.page) {
      this.$router.push({ path: "/", query: { page: "1", category: "test" } });
    }
    if (this.$route.query.page) {
      if (parseInt(this.$route.query.page) > 0) {
        this.$store.state.pageNumber = parseInt(this.$route.query.page) - 1;
        this.$store.commit("pages");
      } else {
        this.$router.push({ path: "/", query: { page: "1" } });
      }
    }
  },
  watch: {
    $route() {
      console.log(this.$route);
      if (this.$route.path == "/" && !this.$route.query.page) {
        this.$router.push({ path: "/", query: { page: "1" } });
      }
      if (this.$route.query.page) {
        this.$store.state.pageNumber = parseInt(this.$route.query.page) - 1;
        this.$store.commit("pages");
      }
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
      } else {
        this.$store.state.showProduct = true;
      }
    },
    categoryChange(e) {
      console.log(e.target.id.replaceAll(' ',''));
      this.$store.state.searchCategoryList[e.target.id.replaceAll(' ','')] = !this.$store.state.searchCategoryList[e.target.id.replaceAll(' ','')]
      console.log(this.$store.state.searchCategoryList)
      let showRouteCategory = ""
      Object.keys(this.$store.state.searchCategoryList).forEach(item=>{
        if(this.$store.state.searchCategoryList[item]){
          showRouteCategory == "" ?  showRouteCategory += item : showRouteCategory += "-" + item
        }
      })
      console.log(showRouteCategory)
      this.$router.push({path: "/", query:{page:this.$route.query.page, category:showRouteCategory}})
      console.log(this.$route.query)
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
.sidebar {
  float: left;
  height: 100vh;
  width: 200px;
  background: #42b983;
}
</style>