import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeAllData: [],
    filtredData: [],
    showProduct: true,
    productInfo: Object,
    cartProduct: [],
    cartPrice: 0,
    cartNumber: 0,
    pageNumber: 0,
    selected: "recommen",
    searchInput: "",
    showedProduct: [],
    categoryList: [],
    searchCategoryList: {},
    routerQuery: []
  },
  mutations: {
    calculate(state) {
      localStorage.setItem("cart", JSON.stringify(state.cartProduct));
      state.cartPrice = 0;
      state.cartNumber = 0;
      if (state.cartProduct) {
        state.cartProduct.forEach((item) => {
          state.cartPrice += item.price * item.count;
          state.cartNumber += item.count;
        });
      }
    },
    pages(state) {
      state.showedProduct = state.filtredData.slice(state.pageNumber * 5, 5 + 5 * state.pageNumber)
      //console.log(state.showedProduct)
    },
    searchAndShow(state) {
      state.filtredData = []
      state.storeAllData.forEach(item => {
        if (state.searchCategoryList[(item.category.replace(" ", ""))]) {
          state.filtredData.push(item)
        }
      })
      if (state.filtredData.length < 1) {
        state.filtredData = [...state.storeAllData]
      }
      console.log(state.filtredData)
      if (state.searchInput != "") {
        const willFilterData = state.filtredData
        state.filtredData = []
        willFilterData.forEach(item => {
          if ((item.title).toLowerCase().search((state.searchInput).toLowerCase()) > -1 || (item.description).toLowerCase().search((state.searchInput).toLowerCase()) > -1) {
            state.filtredData.push(item)
          }
        })
      }
      if (state.selected != "recommen") {
        console.log(state.selected)
        if (state.selected == "priceInc") { state.filtredData.sort((a, b) => a.price - b.price) }
        if (state.selected == "priceDec") { state.filtredData.sort((a, b) => b.price - a.price) }
        if (state.selected == "name") { state.filtredData.sort((a, b) => a.title - b.title) }
      }
      console.log(state.filtredData)
    }
  },
  actions: {
  },
  modules: {
  }
})
