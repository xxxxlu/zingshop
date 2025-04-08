<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="container">
        <div class="hero-content">
          <h1>Welcome to <span>ZING SHOP</span></h1>
          <p>Discover authentic Pakistani products at great prices</p>
          <div class="hero-cta">
            <router-link to="/" class="btn btn-primary btn-lg">Shop Now</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Shop by Category</h2>
        <div class="categories-grid">
          <div class="category-card" @click="filterByCategory('Electronics')">
            <div class="category-icon"><i class="fas fa-mobile-alt"></i></div>
            <h3>Electronics</h3>
          </div>
          <div class="category-card" @click="filterByCategory('Clothing')">
            <div class="category-icon"><i class="fas fa-tshirt"></i></div>
            <h3>Clothing</h3>
          </div>
          <div class="category-card" @click="filterByCategory('Footwear')">
            <div class="category-icon"><i class="fas fa-shoe-prints"></i></div>
            <h3>Footwear</h3>
          </div>
          <div class="category-card" @click="filterByCategory('Kitchen')">
            <div class="category-icon"><i class="fas fa-utensils"></i></div>
            <h3>Kitchen</h3>
          </div>
          <div class="category-card" @click="filterByCategory('Home')">
            <div class="category-icon"><i class="fas fa-home"></i></div>
            <h3>Home</h3>
          </div>
          <div class="category-card" @click="filterByCategory('Home Decor')">
            <div class="category-icon"><i class="fas fa-couch"></i></div>
            <h3>Home Decor</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products-section">
      <div class="container">
        <div class="products-header">
          <h2 class="section-title">{{ pageTitle }}</h2>

          <div class="filters">
            <div class="filter-group">
              <label for="sort">Sort By:</label>
              <select id="sort" v-model="sortBy" @change="applyFilters">
                <option value="default">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        <div class="products-grid" v-if="filteredProducts.length > 0">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div class="no-products" v-else>
          <i class="fas fa-box-open"></i>
          <p>No products found matching your criteria.</p>
          <button class="btn btn-primary" @click="resetFilters">Reset Filters</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  data() {
    return {
      sortBy: 'default',
      currentCategory: null,
      searchQuery: ''
    };
  },
  computed: {
    ...mapState(['products']),

    pageTitle() {
      if (this.searchQuery) {
        return `Search Results for "${this.searchQuery}"`;
      } else if (this.currentCategory) {
        return this.currentCategory;
      } else {
        return 'Our Products';
      }
    },

    filteredProducts() {
      let result = [...this.products];

      // Filter by category if set
      if (this.currentCategory) {
        result = result.filter(product => product.category === this.currentCategory);
      }

      // Filter by search query if set
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
        );
      }

      // Apply sorting
      switch (this.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          // Default sort - could be by featured status or ID
          break;
      }

      return result;
    }
  },
  methods: {
    filterByCategory(category) {
      this.currentCategory = category;
      this.$router.push({ path: '/', query: { category } });
    },
    applyFilters() {
      // Update URL with current filters
      const query = { ...this.$route.query, sort: this.sortBy };
      this.$router.push({ path: '/', query });
    },
    resetFilters() {
      this.currentCategory = null;
      this.searchQuery = '';
      this.sortBy = 'default';
      this.$router.push({ path: '/' });
    },
    checkRouteParams() {
      const { category, search, sort } = this.$route.query;

      if (category) {
        this.currentCategory = category;
      }

      if (search) {
        this.searchQuery = search;
      }

      if (sort) {
        this.sortBy = sort;
      }
    }
  },
  created() {
    this.checkRouteParams();
  },
  watch: {
    '$route.query': {
      handler() {
        this.checkRouteParams();
      },
      deep: true
    }
  }
};
</script>

<style scoped>
:root {
  --primary-color: #ff8a8a; /* 淡红色主题色 */
  --primary-hover: #ff6b6b;
  --primary-light: rgba(255, 138, 138, 0.12);
  --primary-lighter: rgba(255, 138, 138, 0.05);
  --success-color: #67c23a;
  --text-dark: #333;
  --text-light: #777;
  --border-light: #eeeeee;
  --shadow-light: 0 4px 12px rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 6px 16px rgba(0, 0, 0, 0.1);
  --transition-normal: all 0.3s ease;
}

/* 全局按钮样式 */
.btn {
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: var(--transition-normal);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 4px 10px rgba(255, 138, 138, 0.3);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(255, 138, 138, 0.35);
}

.btn-lg {
  padding: 14px 32px;
  font-size: 1.1rem;
}

/* 全局部分标题样式 */
.section-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: var(--text-dark);
  position: relative;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background-color: var(--primary-color);
  border-radius: 3px;
}

/* Hero Banner */
.hero-banner {
  background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('https://same-assets.com/images/banners/pakistan-market.jpg') no-repeat center center;
  background-size: cover;
  height: 450px;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 50px;
  position: relative;
  animation: fadeIn 0.8s ease-out;
}

.hero-content {
  max-width: 650px;
  text-align: center;
  margin: 0 auto;
  animation: slideUp 0.6s ease-out;
}

.hero-content h1 {
  font-size: 2.8rem;
  margin-bottom: 1.2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
}

.hero-content span {
  color: var(--primary-color);
  position: relative;
  display: inline-block;
}

.hero-content span::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-color);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.6s ease-out;
}

.hero-content:hover span::after {
  transform: scaleX(1);
  transform-origin: left;
}

.hero-content p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.hero-cta .btn-lg {
  padding: 14px 34px;
  font-size: 1.15rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.hero-cta .btn-lg:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 10px 20px rgba(255, 138, 138, 0.4);
}

/* Categories Section */
.categories-section {
  margin-bottom: 60px;
  padding: 20px 0;
  animation: fadeIn 0.8s ease-out;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.category-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: var(--shadow-light);
  padding: 25px 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-light);
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--primary-lighter);
  transform: translateY(100%);
  transition: transform 0.4s ease;
  z-index: 0;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-color);
}

.category-card:hover::before {
  transform: translateY(0);
}

.category-icon {
  background-color: var(--primary-light);
  color: var(--primary-color);
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  font-size: 1.6rem;
  position: relative;
  z-index: 1;
  transition: var(--transition-normal);
}

.category-card:hover .category-icon {
  transform: scale(1.1);
  box-shadow: 0 0 0 8px var(--primary-lighter);
}

.category-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  position: relative;
  z-index: 1;
  transition: var(--transition-normal);
}

.category-card:hover h3 {
  color: var(--primary-hover);
}

/* Products Section */
.products-section {
  margin-bottom: 80px;
  animation: fadeIn 0.8s ease-out;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filters {
  display: flex;
  gap: 20px;
}

.filter-group {
  display: flex;
  align-items: center;
}

.filter-group label {
  margin-right: 10px;
  font-weight: 500;
  color: var(--text-dark);
}

.filter-group select {
  padding: 12px 16px;
  border: 1px solid var(--border-light);
  border-radius: 8px;
  background-color: white;
  font-size: 0.95rem;
  color: var(--text-dark);
  cursor: pointer;
  transition: var(--transition-normal);
}

.filter-group select:hover {
  border-color: #ddd;
}

.filter-group select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 30px;
}

.no-products {
  text-align: center;
  padding: 60px 0;
  animation: fadeIn 0.6s ease-out;
}

.no-products i {
  font-size: 5rem;
  color: #e0e0e0;
  margin-bottom: 1.5rem;
  animation: bounce 2s infinite;
}

.no-products p {
  font-size: 1.3rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0; 
    transform: translateY(20px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .hero-banner {
    height: 350px;
  }

  .hero-content h1 {
    font-size: 2rem;
  }

  .hero-content p {
    font-size: 1.1rem;
  }

  .products-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .filters {
    width: 100%;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 20px;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .category-card {
    padding: 20px 10px;
  }
  
  .category-icon {
    width: 60px;
    height: 60px;
    font-size: 1.4rem;
  }
  
  .category-card h3 {
    font-size: 0.95rem;
  }
}
</style>
