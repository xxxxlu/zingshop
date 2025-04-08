import Vue from 'vue';
import Vuex from 'vuex';
import productsData from './products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: productsData,
    cart: [],
    checkout: {
      step: 1,
      customerInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: ''
      }
    }
  },
  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    },
    cartItemCount(state) {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    },
    productById: (state) => (id) => {
      return state.products.find(product => product.id === parseInt(id));
    }
  },
  mutations: {
    ADD_TO_CART(state, { product, quantity }) {
      const existingItem = state.cart.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({
          ...product,
          quantity
        });
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    UPDATE_CART_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    LOAD_CART(state) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        state.cart = JSON.parse(savedCart);
      }
    },
    CLEAR_CART(state) {
      state.cart = [];
      localStorage.removeItem('cart');
    },
    SET_CHECKOUT_STEP(state, step) {
      state.checkout.step = step;
    },
    SET_CUSTOMER_INFO(state, info) {
      state.checkout.customerInfo = { ...state.checkout.customerInfo, ...info };
    }
  },
  actions: {
    addToCart({ commit }, payload) {
      // Check if adding would exceed max price of Rs. 50000
      const cartTotal = this.getters.cartTotal;
      const addingTotal = payload.product.price * payload.quantity;

      if (cartTotal + addingTotal > 50000) {
        alert('Cart total cannot exceed Rs. 50,000');
        return false;
      }

      commit('ADD_TO_CART', payload);
      return true;
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
    },
    updateCartQuantity({ commit, state, getters }, { productId, quantity }) {
      const item = state.cart.find(item => item.id === productId);
      const currentTotal = getters.cartTotal;
      const currentItemTotal = item.price * item.quantity;
      const newItemTotal = item.price * quantity;
      const newTotal = currentTotal - currentItemTotal + newItemTotal;

      if (newTotal > 50000) {
        alert('Cart total cannot exceed Rs. 50,000');
        return false;
      }

      commit('UPDATE_CART_QUANTITY', { productId, quantity });
      return true;
    },
    loadCart({ commit }) {
      commit('LOAD_CART');
    },
    clearCart({ commit }) {
      commit('CLEAR_CART');
    },
    setCheckoutStep({ commit }, step) {
      commit('SET_CHECKOUT_STEP', step);
    },
    setCustomerInfo({ commit }, info) {
      commit('SET_CUSTOMER_INFO', info);
    },
    placeOrder({ commit }) {
      // Here we would typically send the order to a server
      // For this demo, we'll just clear the cart
      commit('CLEAR_CART');
      commit('SET_CHECKOUT_STEP', 3);
    }
  }
});
