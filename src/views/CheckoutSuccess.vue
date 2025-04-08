<template>
  <div class="checkout-page">
    <div class="container">
      <h1 class="section-title">Checkout</h1>

      <div class="checkout-container">
        <!-- Checkout Steps Progress -->
        <div class="checkout-progress">
          <div class="progress-step completed">
            <div class="step-number">1</div>
            <div class="step-label">Products</div>
          </div>
          <div class="progress-bar active"></div>
          <div class="progress-step completed">
            <div class="step-number">2</div>
            <div class="step-label">Information</div>
          </div>
          <div class="progress-bar active"></div>
          <div class="progress-step active">
            <div class="step-number">3</div>
            <div class="step-label">Confirmation</div>
          </div>
        </div>

        <!-- Order Success (Step 3) -->
        <div class="checkout-content">
          <div class="success-message">
            <div class="success-icon">
              <i class="fas fa-check-circle"></i>
            </div>

            <h2>Thank You for Your Order!</h2>
            <p>Your order has been placed successfully. You will receive a confirmation email shortly.</p>

            <div class="order-details">
              <h3>Order Details</h3>

              <div class="detail-row">
                <div class="detail-label">Order Number:</div>
                <div class="detail-value">{{ orderNumber }}</div>
              </div>

              <div class="detail-row">
                <div class="detail-label">Date:</div>
                <div class="detail-value">{{ currentDate }}</div>
              </div>

              <div class="detail-row">
                <div class="detail-label">Payment Method:</div>
                <div class="detail-value">{{ paymentMethodLabel }}</div>
              </div>

              <div class="detail-row">
                <div class="detail-label">Total Amount:</div>
                <div class="detail-value">Rs. {{ orderTotal }}</div>
              </div>
            </div>

            <div class="customer-info">
              <h3>Shipping Information</h3>

              <div class="info-group" v-if="checkout.customerInfo">
                <div class="info-row">
                  <div class="info-label">Name:</div>
                  <div class="info-value">{{ checkout.customerInfo.name }}</div>
                </div>

                <div class="info-row">
                  <div class="info-label">Email:</div>
                  <div class="info-value">{{ checkout.customerInfo.email }}</div>
                </div>

                <div class="info-row">
                  <div class="info-label">Phone:</div>
                  <div class="info-value">{{ checkout.customerInfo.phone }}</div>
                </div>

                <div class="info-row">
                  <div class="info-label">Address:</div>
                  <div class="info-value">{{ checkout.customerInfo.address }}</div>
                </div>

                <div class="info-row">
                  <div class="info-label">City:</div>
                  <div class="info-value">{{ checkout.customerInfo.city }}</div>
                </div>

                <div class="info-row">
                  <div class="info-label">Postal Code:</div>
                  <div class="info-value">{{ checkout.customerInfo.zipCode }}</div>
                </div>
              </div>
            </div>

            <div class="success-actions">
              <router-link to="/" class="btn btn-primary">
                Continue Shopping
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CheckoutSuccess',
  computed: {
    ...mapState(['checkout']),

    orderNumber() {
      // Generate a random order number
      return 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    },

    currentDate() {
      const date = new Date();
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    paymentMethodLabel() {
      if (!this.checkout.customerInfo || !this.checkout.customerInfo.paymentMethod) {
        return 'Cash on Delivery';
      }

      return this.checkout.customerInfo.paymentMethod === 'cash'
        ? 'Cash on Delivery'
        : 'Bank Transfer';
    },

    orderTotal() {
      // In a real app, you would get this from the store
      // Here we're generating a random number between 1000 and 10000
      const total = Math.floor(1000 + Math.random() * 9000);
      return total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  created() {
    // Check if we're on step 3, if not redirect to checkout
    if (this.checkout.step !== 3) {
      this.$router.push('/checkout');
    }
  }
};
</script>

<style scoped>
.checkout-page {
  padding: 30px 0 60px;
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

/* Success Content */
.checkout-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.success-message {
  text-align: center;
}

.success-icon {
  font-size: 4rem;
  color: #43a047;
  margin-bottom: 20px;
}

.success-message h2 {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
}

.success-message p {
  color: #666;
  max-width: 600px;
  margin: 0 auto 30px;
}

.order-details, .customer-info {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  text-align: left;
}

.order-details h3, .customer-info h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
  color: #333;
}

.detail-row, .info-row {
  display: flex;
  margin-bottom: 10px;
}

.detail-row:last-child, .info-row:last-child {
  margin-bottom: 0;
}

.detail-label, .info-label {
  flex: 0 0 150px;
  font-weight: 600;
  color: #555;
}

.detail-value, .info-value {
  flex: 1;
  color: #333;
}

.success-actions {
  margin-top: 30px;
}

.success-actions .btn {
  padding: 12px 30px;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .step-label {
    font-size: 0.8rem;
  }

  .progress-bar {
    margin: 0 10px;
    margin-bottom: 28px;
  }

  .detail-row, .info-row {
    flex-direction: column;
  }

  .detail-label, .info-label {
    margin-bottom: 5px;
  }
}
</style>
