<template>
  <div class="cart-page">
    <div class="container">
      <h1 class="section-title">Your Shopping Cart</h1>

      <div class="cart-empty" v-if="cart.length === 0">
        <i class="fas fa-shopping-cart"></i>
        <h2>Your cart is empty</h2>
        <p>You haven't added any products to your cart yet.</p>
        <router-link to="/" class="btn btn-primary">Continue Shopping</router-link>
      </div>

      <div class="cart-container" v-else>
        <div class="cart-items">
          <div class="cart-item" v-for="item in cart" :key="item.id">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
            </div>

            <div class="item-details">
              <router-link :to="`/product/${item.id}`" class="item-name">{{ item.name }}</router-link>
              <div class="item-category">Category: {{ item.category }}</div>
              <div class="item-price">Rs. {{ formatPrice(item.price) }}</div>
            </div>

            <div class="item-quantity">
              <div class="quantity-selector">
                <button @click="decrementQuantity(item)" :disabled="item.quantity <= 1">
                  <i class="fas fa-minus"></i>
                </button>
                <input type="number" v-model.number="item.quantity" @change="updateQuantity(item)" min="1" max="10">
                <button @click="incrementQuantity(item)" :disabled="item.quantity >= 10">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <div class="item-subtotal">
              <div class="subtotal-label">Subtotal:</div>
              <div class="subtotal-value">Rs. {{ formatPrice(item.price * item.quantity) }}</div>
            </div>

            <button class="remove-item" @click="removeItem(item.id)">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <div class="cart-total">
            <h3>Order Summary</h3>

            <div class="summary-row">
              <div class="summary-label">Subtotal</div>
              <div class="summary-value">Rs. {{ formatPrice(cartTotal) }}</div>
            </div>

            <div class="summary-row">
              <div class="summary-label">Shipping</div>
              <div class="summary-value">{{ shippingCost === 0 ? 'Free' : `Rs. ${formatPrice(shippingCost)}` }}</div>
            </div>

            <div class="summary-row total">
              <div class="summary-label">Total</div>
              <div class="summary-value">Rs. {{ formatPrice(cartTotal + shippingCost) }}</div>
            </div>

            <div class="cart-actions">
              <router-link to="/checkout" class="btn btn-primary btn-block">
                Proceed to Checkout
              </router-link>

              <router-link to="/" class="btn btn-secondary btn-block">
                Continue Shopping
              </router-link>
            </div>
          </div>

          <div class="cart-note">
            <p><i class="fas fa-info-circle"></i> Maximum order value: Rs. 50,000</p>
            <p><i class="fas fa-truck"></i> Free shipping on orders over Rs. 3,000</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['cartTotal']),

    shippingCost() {
      return this.cartTotal >= 3000 ? 0 : 300;
    }
  },
  methods: {
    ...mapActions(['removeFromCart', 'updateCartQuantity']),

    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    incrementQuantity(item) {
      if (item.quantity < 10) {
        this.updateQuantity({
          ...item,
          quantity: item.quantity + 1
        });
      }
    },

    decrementQuantity(item) {
      if (item.quantity > 1) {
        this.updateQuantity({
          ...item,
          quantity: item.quantity - 1
        });
      }
    },

    updateQuantity(item) {
      // Ensure quantity is at least 1
      const quantity = Math.max(1, Math.min(10, item.quantity));

      this.updateCartQuantity({
        productId: item.id,
        quantity
      });
    },

    removeItem(productId) {
      if (confirm('Are you sure you want to remove this item from your cart?')) {
        this.removeFromCart(productId);
      }
    }
  },
  created() {
    // Load cart from localStorage if available
    this.$store.dispatch('loadCart');
  }
};
</script>

<style scoped>
.cart-page {
  padding: 30px 0 60px;
}

.cart-empty {
  text-align: center;
  padding: 50px 0;
}

.cart-empty i {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.cart-empty h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.cart-empty p {
  color: #777;
  margin-bottom: 20px;
}

.cart-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-items {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 4px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-name {
  font-weight: 500;
  color: #333;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
}

.item-name:hover {
  color: #d71f1f;
}

.item-category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 5px;
}

.item-price {
  font-weight: 700;
  color: #333;
}

.quantity-selector {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  width: 120px;
}

.quantity-selector button {
  width: 36px;
  height: 36px;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
}

.quantity-selector button:hover {
  background-color: #e0e0e0;
}

.quantity-selector button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-selector input {
  width: 48px;
  text-align: center;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  font-size: 0.9rem;
}

.item-subtotal {
  text-align: right;
}

.subtotal-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 3px;
}

.subtotal-value {
  font-weight: 700;
  color: #d71f1f;
}

.remove-item {
  background: none;
  border: none;
  color: #666;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.3s;
}

.remove-item:hover {
  color: #d71f1f;
}

.cart-summary {
  position: sticky;
  top: 100px;
}

.cart-total {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.cart-total h3 {
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  padding-bottom: 10px;
}

.cart-total h3:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background-color: #d71f1f;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.summary-row:last-of-type {
  border-bottom: none;
}

.summary-row.total {
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
  margin-top: 10px;
  margin-bottom: 20px;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cart-note {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
}

.cart-note p {
  margin-bottom: 10px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.cart-note p:last-child {
  margin-bottom: 0;
}

.cart-note i {
  color: #d71f1f;
  margin-right: 8px;
}

@media (max-width: 992px) {
  .cart-container {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 15px;
  }

  .item-image {
    width: 80px;
    height: 80px;
    grid-row: span 2;
  }

  .item-quantity {
    grid-column: 1;
    grid-row: 3;
  }

  .item-subtotal {
    grid-column: 2;
    grid-row: 3;
    text-align: left;
  }

  .remove-item {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}

@media (max-width: 576px) {
  .cart-item {
    position: relative;
    padding-right: 40px;
  }
}
</style>
