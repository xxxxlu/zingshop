<template>
  <div class="product-detail" v-if="product">
    <div class="container">
      <div class="breadcrumb">
        <router-link to="/">Home</router-link> /
        <router-link :to="`/?category=${product.category}`">{{ product.category }}</router-link> /
        <span>{{ product.name }}</span>
      </div>

      <div class="product-container">
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image">
        </div>

        <div class="product-info">
          <h1 class="product-name">{{ product.name }}</h1>
          <p class="product-price">Rs. {{ formatPrice(product.price) }}</p>

          <div class="product-status" :class="{ 'out-of-stock': !product.inStock }">
            <i :class="product.inStock ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
            {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
          </div>

          <div class="product-description">
            <h3>Product Description</h3>
            <p>{{ product.description }}</p>
          </div>

          <div class="product-actions" v-if="product.inStock">
            <div class="quantity-selector">
              <button @click="decrementQuantity" :disabled="quantity <= 1">
                <i class="fas fa-minus"></i>
              </button>
              <input type="number" v-model.number="quantity" min="1" max="10">
              <button @click="incrementQuantity" :disabled="quantity >= 10">
                <i class="fas fa-plus"></i>
              </button>
            </div>

            <button class="btn btn-primary add-to-cart" @click="addToCart">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>

          <div class="out-of-stock-message" v-else>
            <p><i class="fas fa-exclamation-circle"></i> This product is currently out of stock.</p>
          </div>

          <div class="shipping-info">
            <h3>Shipping Information</h3>
            <ul>
              <li><i class="fas fa-truck"></i> Free shipping on orders over Rs. 3,000</li>
              <li><i class="fas fa-clock"></i> Delivery within 3-5 business days</li>
              <li><i class="fas fa-shield-alt"></i> Secure payment</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div class="related-products" v-if="relatedProducts.length > 0">
        <h2 class="section-title">Related Products</h2>
        <div class="products-grid">
          <ProductCard
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="product-not-found" v-else>
    <div class="container">
      <i class="fas fa-search"></i>
      <h2>Product Not Found</h2>
      <p>The product you are looking for doesn't exist or has been removed.</p>
      <router-link to="/" class="btn btn-primary">Return to Shop</router-link>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  data() {
    return {
      quantity: 1
    };
  },
  computed: {
    ...mapGetters(['productById']),

    productId() {
      return parseInt(this.$route.params.id);
    },

    product() {
      return this.productById(this.productId);
    },

    relatedProducts() {
      if (!this.product) return [];

      // Get products in the same category
      return this.$store.state.products
        .filter(p => p.category === this.product.category && p.id !== this.product.id)
        .slice(0, 4); // Limit to 4 related products
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    incrementQuantity() {
      if (this.quantity < 10) this.quantity++;
    },
    decrementQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    addToCart() {
      if (this.product && this.product.inStock) {
        const success = this.$store.dispatch('addToCart', {
          product: this.product,
          quantity: this.quantity
        });

        if (success) {
          this.$router.push('/cart');
        }
      }
    }
  }
};
</script>

<style scoped>
.breadcrumb {
  margin: 20px 0;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: #666;
  text-decoration: none;
}

.breadcrumb a:hover {
  color: #d71f1f;
}

.breadcrumb span {
  color: #333;
  font-weight: 500;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 60px;
}

.product-image-container {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: auto;
  display: block;
}

.product-name {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #d71f1f;
  margin-bottom: 15px;
}

.product-status {
  display: inline-flex;
  align-items: center;
  background-color: #e8f4ea;
  color: #2e7d32;
  padding: 6px 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-weight: 500;
}

.product-status i {
  margin-right: 6px;
}

.product-status.out-of-stock {
  background-color: #fbe9e7;
  color: #c62828;
}

.product-description {
  margin-bottom: 25px;
}

.product-description h3 {
  font-size: 1.1rem;
  margin-bottom: 10px;
}

.product-description p {
  line-height: 1.6;
  color: #555;
}

.product-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.quantity-selector {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-selector button {
  width: 40px;
  height: 40px;
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
  width: 60px;
  text-align: center;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  font-size: 1rem;
}

.add-to-cart {
  padding: 0 20px;
}

.out-of-stock-message {
  background-color: #fbe9e7;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 25px;
}

.out-of-stock-message p {
  display: flex;
  align-items: center;
  color: #c62828;
  font-weight: 500;
}

.out-of-stock-message i {
  margin-right: 8px;
}

.shipping-info {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.shipping-info h3 {
  font-size: 1.1rem;
  margin-bottom: 15px;
}

.shipping-info ul {
  list-style: none;
  padding: 0;
}

.shipping-info li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.shipping-info i {
  color: #d71f1f;
  margin-right: 10px;
}

.related-products {
  margin-bottom: 60px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.product-not-found {
  text-align: center;
  padding: 100px 0;
}

.product-not-found i {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 1rem;
}

.product-not-found h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.product-not-found p {
  color: #777;
  margin-bottom: 20px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 992px) {
  .product-container {
    grid-template-columns: 1fr;
  }
}
</style>
