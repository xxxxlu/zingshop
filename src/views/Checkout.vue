<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="section-title">Checkout</h1>

      <div class="checkout-empty" v-if="cart.length === 0">
        <i class="fas fa-shopping-bag"></i>
        <h2>Your cart is empty</h2>
        <p>You need to add products to your cart before proceeding to checkout.</p>
        <router-link to="/" class="btn btn-primary">Shop Now</router-link>
      </div>

      <div class="checkout-container" v-else>
        <!-- Checkout Steps Progress -->
        <div class="checkout-progress">
          <div class="progress-step" :class="{ 'active': checkout.step >= 1, 'completed': checkout.step > 1 }">
            <div class="step-number">1</div>
            <div class="step-label">Products</div>
          </div>
          <div class="progress-bar" :class="{ 'active': checkout.step > 1 }"></div>
          <div class="progress-step" :class="{ 'active': checkout.step >= 2, 'completed': checkout.step > 2 }">
            <div class="step-number">2</div>
            <div class="step-label">Information</div>
          </div>
          <div class="progress-bar" :class="{ 'active': checkout.step > 2 }"></div>
          <div class="progress-step" :class="{ 'active': checkout.step >= 3 }">
            <div class="step-number">3</div>
            <div class="step-label">Confirmation</div>
          </div>
        </div>

        <!-- Products Review (Step 1) -->
        <div class="checkout-content">
          <div class="products-summary">
            <h2>Order Summary</h2>

            <div class="checkout-items">
              <div class="checkout-item" v-for="item in cart" :key="item.id">
                <div class="item-image">
                  <img :src="item.image" :alt="item.name">
                  <span class="item-quantity">{{ item.quantity }}</span>
                </div>

                <div class="item-details">
                  <div class="item-name">{{ item.name }}</div>
                  <div class="item-category">{{ item.category }}</div>
                </div>

                <div class="item-price">
                  Rs. {{ formatPrice(item.price * item.quantity) }}
                </div>
              </div>
            </div>

            <div class="checkout-summary">
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
            </div>

            <div class="checkout-actions">
              <router-link to="/cart" class="btn btn-secondary">
                <i class="fas fa-arrow-left"></i> Back to Cart
              </router-link>

              <router-link to="/checkout/information" class="btn btn-primary" @click.native="setCheckoutStep(2)">
                Continue to Information <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'Checkout',
  computed: {
    ...mapState(['cart', 'checkout']),
    ...mapGetters(['cartTotal']),

    shippingCost() {
      return this.cartTotal >= 3000 ? 0 : 300;
    }
  },
  methods: {
    ...mapActions(['setCheckoutStep']),

    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  created() {
    // Load cart from localStorage if available
    this.$store.dispatch('loadCart');

    // Set checkout step to 1
    this.setCheckoutStep(1);
  }
};
</script>

<style scoped>
.checkout-page {
  padding: 30px 0 60px;
}

.checkout-empty {
  text-align: center;
  padding: 50px 0;
}

.checkout-empty i {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.checkout-empty h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.checkout-empty p {
  color: #777;
  margin-bottom: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.checkout-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Progress Bar */
.checkout-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 auto;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-bottom: 8px;
  color: #777;
  border: 2px solid transparent;
}

.step-label {
  font-size: 0.9rem;
  color: #777;
  font-weight: 500;
}

.progress-bar {
  flex-grow: 1;
  height: 3px;
  background-color: #f0f0f0;
  margin: 0 15px;
  margin-bottom: 28px;
}

.progress-step.active .step-number {
  background-color: #d71f1f;
  color: white;
  border-color: #d71f1f;
}

.progress-step.active .step-label {
  color: #333;
}

.progress-step.completed .step-number {
  background-color: #43a047;
  color: white;
  border-color: #43a047;
}

.progress-bar.active {
  background-color: #43a047;
}

/* Checkout Content */
.checkout-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.products-summary h2 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.checkout-items {
  margin-bottom: 30px;
}

.checkout-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.checkout-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-quantity {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #d71f1f;
  color: white;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 500;
}

.item-name {
  font-weight: 500;
  margin-bottom: 5px;
}

.item-category {
  font-size: 0.9rem;
  color: #666;
}

.item-price {
  font-weight: 700;
  color: #333;
}

.checkout-summary {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e9ecef;
}

.summary-row:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.summary-row.total {
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
  margin-top: 10px;
}

.checkout-actions {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 768px) {
  .step-label {
    font-size: 0.8rem;
  }

  .progress-bar {
    margin: 0 10px;
    margin-bottom: 28px;
  }

  .checkout-item {
    grid-template-columns: 60px 1fr;
  }

  .item-price {
    grid-column: 2;
    text-align: right;
  }

  .checkout-actions {
    flex-direction: column;
    gap: 15px;
  }

  .checkout-actions .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
