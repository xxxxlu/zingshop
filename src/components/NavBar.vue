<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <div class="logo">
          <router-link to="/">
            <h1>ZING<span>Shop</span></h1>
          </router-link>
        </div>

        <nav class="nav">
          <ul class="nav-links">
            <li><router-link to="/">Home</router-link></li>
            <li class="dropdown">
              <a href="#" @click.prevent>Categories</a>
              <div class="dropdown-content">
                <router-link to="/?category=Electronics">Electronics</router-link>
                <router-link to="/?category=Clothing">Clothing</router-link>
                <router-link to="/?category=Footwear">Footwear</router-link>
                <router-link to="/?category=Kitchen">Kitchen</router-link>
                <router-link to="/?category=Home">Home</router-link>
                <router-link to="/?category=Home Decor">Home Decor</router-link>
                <router-link to="/?category=Grocery">Grocery</router-link>
                <router-link to="/?category=Beauty">Beauty</router-link>
                <router-link to="/?category=Accessories">Accessories</router-link>
              </div>
            </li>
            <li><router-link to="/contact">Contact Us</router-link></li>
          </ul>
        </nav>

        <div class="header-actions">
          <div class="search">
            <input type="text" placeholder="Search products..." v-model="searchQuery" @keyup.enter="handleSearch">
            <button @click="handleSearch"><i class="fas fa-search"></i></button>
          </div>

          <div class="cart-icon">
            <router-link to="/cart">
              <i class="fas fa-shopping-cart"></i>
              <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
            </router-link>
          </div>
        </div>

        <div class="mobile-toggle" @click="toggleMobileMenu">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </div>

    <div class="mobile-menu" :class="{ 'active': mobileMenuActive }">
      <ul>
        <li><router-link to="/" @click="closeMobileMenu">Home</router-link></li>
        <li><router-link to="/?category=Electronics" @click="closeMobileMenu">Electronics</router-link></li>
        <li><router-link to="/?category=Clothing" @click="closeMobileMenu">Clothing</router-link></li>
        <li><router-link to="/?category=Footwear" @click="closeMobileMenu">Footwear</router-link></li>
        <li><router-link to="/?category=Kitchen" @click="closeMobileMenu">Kitchen</router-link></li>
        <li><router-link to="/?category=Home" @click="closeMobileMenu">Home</router-link></li>
        <li><router-link to="/?category=Home Decor" @click="closeMobileMenu">Home Decor</router-link></li>
        <li><router-link to="/?category=Grocery" @click="closeMobileMenu">Grocery</router-link></li>
        <li><router-link to="/?category=Beauty" @click="closeMobileMenu">Beauty</router-link></li>
        <li><router-link to="/?category=Accessories" @click="closeMobileMenu">Accessories</router-link></li>
        <li><router-link to="/contact" @click="closeMobileMenu">Contact Us</router-link></li>
        <li><router-link to="/cart" @click="closeMobileMenu">Cart ({{ cartItemCount }})</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  data() {
    return {
      searchQuery: '',
      mobileMenuActive: false
    };
  },
  computed: {
    ...mapGetters(['cartItemCount'])
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push(`/?search=${this.searchQuery.trim()}`);
        this.searchQuery = '';
      }
    },
    toggleMobileMenu() {
      this.mobileMenuActive = !this.mobileMenuActive;
    },
    closeMobileMenu() {
      this.mobileMenuActive = false;
    }
  }
};
</script>

<style scoped>
.header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
}

.logo a {
  text-decoration: none;
  color: #333;
}

.logo h1 {
  font-size: 1.8rem;
  font-weight: 700;
}

.logo span {
  color: #d71f1f;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin: 0 15px;
  position: relative;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #d71f1f;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 180px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  z-index: 1;
  border-radius: 4px;
  padding: 10px 0;
}

.dropdown-content a {
  color: #333;
  padding: 10px 15px;
  text-decoration: none;
  display: block;
  font-weight: 400;
}

.dropdown-content a:hover {
  background-color: #f8f9fa;
  color: #d71f1f;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.header-actions {
  display: flex;
  align-items: center;
}

.search {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin-right: 15px;
}

.search input {
  padding: 8px 10px;
  border: none;
  outline: none;
  width: 180px;
}

.search button {
  background-color: #d71f1f;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
}

.cart-icon {
  position: relative;
}

.cart-icon a {
  color: #333;
  font-size: 1.2rem;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #d71f1f;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mobile-toggle {
  display: none;
  font-size: 1.3rem;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  background-color: white;
  padding: 10px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mobile-menu ul {
  list-style: none;
}

.mobile-menu li {
  padding: 10px 20px;
  border-bottom: 1px solid #f1f1f1;
}

.mobile-menu a {
  color: #333;
  text-decoration: none;
  display: block;
}

@media (max-width: 992px) {
  .nav {
    display: none;
  }

  .search input {
    width: 140px;
  }

  .mobile-toggle {
    display: block;
  }

  .mobile-menu {
    display: none;
  }

  .mobile-menu.active {
    display: block;
  }
}

@media (max-width: 768px) {
  .header-actions .search {
    display: none;
  }
}
</style>
