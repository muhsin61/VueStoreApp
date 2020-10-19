import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeAllData: [],
    showProduct: true,
    productInfo: Object,
    cartProduct: [],
    cartPrice: 0,
    cartNumber: 0,
    pageNumber: 0,
    selected: "recommen",
    searchInput: "",
    showedProduct: [],
    categoryList:[],
    searchCategoryList:{},
    routerQuery: []
  },
  mutations: {
    calculate(state) {
      localStorage.setItem("cart", JSON.stringify(state.cartProduct));
      state.cartPrice = 0;
      state.cartNumber = 0;
      if(state.cartProduct){
        state.cartProduct.forEach((item) => {
          state.cartPrice += item.price * item.count;
          state.cartNumber += item.count;
        });
      }
    },
    pages(state){
      state.showedProduct = state.storeAllData.slice(state.pageNumber * 5 , 5 + 5 * state.pageNumber)
      console.log(state.showedProduct)
    }
  },
  actions: {
  },
  modules: {
  }
})
