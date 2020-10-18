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
      localStorage.setItem("cart", JSON.stringify(state.cartProduct));
      state.cartPrice = 0;
      state.cartNumber = 0;
      if(state.cartProduct){
          state.cartProduct.forEach((item) => {
          state.cartPrice += item.price * item.count;
          state.cartNumber += item.count;
        });
      
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
