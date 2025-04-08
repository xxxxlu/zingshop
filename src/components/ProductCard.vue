<template>
  <div class="product-card">
    <router-link :to="`/product/${product.id}`" class="product-image">
      <img :src="product.image" :alt="product.name">
      <span v-if="!product.inStock" class="out-of-stock">Out of Stock</span>
    </router-link>

    <div class="product-info">
      <div class="product-category">{{ product.category }}</div>
      <router-link :to="`/product/${product.id}`" class="product-name">{{ product.name }}</router-link>
      <div class="product-price">Rs. {{ formatPrice(product.price) }}</div>

      <button
        class="btn btn-primary btn-block add-to-cart"
        @click="addToCart"
        :disabled="!product.inStock">
        <i class="fas fa-shopping-cart"></i>
        {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatPrice(price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    addToCart() {
      if (this.product.inStock) {
        this.$store.dispatch('addToCart', {
          product: this.product,
          quantity: 1
        });
      }
    }
  }
};
</script>

<style scoped>
.product-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.product-image {
  position: relative;
  padding-top: 100%;
  display: block;
  overflow: hidden;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.out-of-stock {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.product-info {
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-category {
  color: #666;
  font-size: 0.8rem;
  margin-bottom: 5px;
}

.product-name {
  font-weight: 500;
  font-size: 1rem;
  color: #333;
  text-decoration: none;
  margin-bottom: 8px;
  display: block;
  line-height: 1.3;
  height: 2.6em;
  overflow: hidden;
}

.product-price {
  font-weight: 700;
  font-size: 1.1rem;
  color: #d71f1f;
  margin-bottom: 12px;
}

.add-to-cart {
  margin-top: auto;
}

.add-to-cart:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
