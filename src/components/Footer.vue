<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>PakistanStore</h3>
          <p>Your trusted online marketplace for authentic Pakistani products.</p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
            <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link"><i class="fab fa-youtube"></i></a>
          </div>
        </div>

        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/contact">Contact Us</router-link></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Customer Service</h3>
          <ul class="footer-links">
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Exchanges</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Contact Info</h3>
          <ul class="contact-info">
            <li><i class="fas fa-map-marker-alt"></i> 123 Main Street, Karachi, Pakistan</li>
            <li><i class="fas fa-envelope"></i> zingshop@zing.shop</li>
          </ul>
          <div class="payment-methods">
            <i class="fab fa-cc-visa"></i>
            <i class="fab fa-cc-mastercard"></i>
            <i class="fab fa-cc-paypal"></i>
            <i class="fas fa-money-bill-wave"></i>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; Copyright © {{ currentYear }}  | Powered by Data Network Solutions (SMC-Private) Limited.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

<style scoped>
.footer {
  background-color: #292929;
  color: #f8f9fa;
  padding: 50px 0 20px;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-section h3 {
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 20px;
  position: relative;
}

.footer-section h3:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 40px;
  height: 2px;
  background-color: #d71f1f;
}

.footer-section p {
  color: #ccc;
  margin-bottom: 15px;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 12px;
  margin-top: 15px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #f8f9fa;
  border-radius: 50%;
  transition: background-color 0.3s, color 0.3s;
}

.social-link:hover {
  background-color: #d71f1f;
  color: white;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #d71f1f;
}

.contact-info {
  list-style: none;
  padding: 0;
}

.contact-info li {
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  color: #ccc;
}

.contact-info i {
  margin-right: 10px;
  color: #d71f1f;
}

.payment-methods {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.payment-methods i {
  font-size: 24px;
  color: #ccc;
  transition: color 0.3s;
}

.payment-methods i:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
  color: #aaa;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
