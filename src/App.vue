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
          :checked="$store.state.searchCategoryList[check.replaceAll(' ', '')]"
          name="test"
          :id="check"
          @change="categoryChange($event)"
        /><label :for="check">{{ check }}</label>
      </div>
    </div>
    <div>
      <input
        @change="searchInput"
        v-model="$store.state.searchInput"
        placeholder="edit me"
      />
      <select v-model="$store.state.selected">
        <option value="recommen" :selected="true">Önerilen</option>
        <option value="priceInc">Fiyat küçükten büyüğe</option>
        <option value="priceDec">Fiyat büyükten küçüğe</option>
        <option value="name">İsme göre</option>
      </select>
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
        this.$store.state.searchCategoryList[
          item.category.replaceAll(" ", "")
        ] = false;
      }
    });
    if (JSON.parse(localStorage.getItem("cart")).length) {
      this.$store.state.cartProduct = JSON.parse(localStorage.getItem("cart"));
      this.$store.commit("calculate");
    }
    if (this.$route.path == "/" && !this.$route.query.page) {
      this.$router.push({ path: "/", query: { page: "1"} });
    }
    if (this.$route.query.page) {
      if (parseInt(this.$route.query.page) > 0) {
        this.$store.state.pageNumber = parseInt(this.$route.query.page) - 1;
        this.$store.commit("pages");
      } else {
        this.$router.push({ path: "/", query: { page: "1" } });
      }
    }
    if (this.$route.query.search) {
      this.$store.state.searchInput = this.$route.query.search;
    }
    if (this.$route.query.list) {
      this.$store.state.selected = this.$route.query.list;
    }
    if (this.$route.query.category) {
      this.$route.query.category.split("-").forEach((item) => {
        this.$store.state.searchCategoryList[item] = true;
      });
    }
  },
  watch: {
    $route() {
      console.log(this.$route);//düzenlenebilir
      if (this.$route.path == "/" && !this.$route.query.page) {
        this.$router.push({ path: "/", query: { page: "1" } });
      }
      if (this.$route.query.page) {
        this.$store.state.pageNumber = parseInt(this.$route.query.page) - 1;
        this.$store.commit("pages");
      }
      this.getRoute();
    },
    "$store.state.selected"() {
      this.$router.push({
        path: "/",
        query: {
          page: this.$route.query.page,
          category: this.$route.query.category,
          search: this.$route.query.search,
          list: this.$store.state.selected,
        },
      });
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
      console.log(e.target.id.replaceAll(" ", ""));
      this.$store.state.searchCategoryList[
        e.target.id.replaceAll(" ", "")
      ] = !this.$store.state.searchCategoryList[
        e.target.id.replaceAll(" ", "")
      ];
      console.log(this.$store.state.searchCategoryList);
      let showRouteCategory = "";
      Object.keys(this.$store.state.searchCategoryList).forEach((item) => {
        if (this.$store.state.searchCategoryList[item]) {
          showRouteCategory == ""
            ? (showRouteCategory += item)
            : (showRouteCategory += "-" + item);
        }
      });
      this.$router.push({
        path: "/",
        query: {
          page: this.$route.query.page,
          category: showRouteCategory,
          search: this.$route.search,
          list: this.$route.query.list,
        },
      });
    },
    searchInput() {
      this.$router.push({
        path: "/",
        query: {
          page: this.$route.query.page,
          category: this.$route.query.category,
          search: this.$store.state.searchInput,
          list: this.$route.query.list,
        },
      });
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