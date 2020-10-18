import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeAllData: [],
    showStorewItems: [],
    showProduct: true,
    productInfo: Object,
    cartProduct: [],
    cartPrice: 0,
    cartNumber: 0,
  },
  mutations: {
    calculate(state) {
      state.cartPrice = 0;
      state.cartNumber = 0;
      state.cartProduct.forEach((item) => {
        state.cartPrice += item.price * item.count;
        state.cartNumber += item.count;
      });
    }
  },
  actions: {
  },
  modules: {
  }
})
