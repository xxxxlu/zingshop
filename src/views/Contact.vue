<template>
  <div class="contact-page">
    <div class="container">
      <h1 class="section-title">Contact Us</h1>

      <div class="contact-container">
        <div class="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions about our products or your order? We're here to help! Use the contact information below or fill out the form to reach our customer service team.</p>

          <div class="info-items">

            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="info-content">
                <h3>Email</h3>
                <p>zingshop@zingshop.store</p>
              </div>
            </div>

            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="info-content">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div class="social-links">
            <h3>Follow Us</h3>
            <div class="social-icons">
              <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
            </div>
          </div>
        </div>

        <div class="contact-form">
          <h2>Send Us a Message</h2>

          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Name <span class="required">*</span></label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                placeholder="Enter your name"
              >
            </div>

            <div class="form-group">
              <label for="email">Email <span class="required">*</span></label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                placeholder="Enter your email"
              >
            </div>

            <div class="form-group">
              <label for="subject">Subject <span class="required">*</span></label>
              <input
                type="text"
                id="subject"
                v-model="form.subject"
                required
                placeholder="Enter message subject"
              >
            </div>

            <div class="form-group">
              <label for="message">Message <span class="required">*</span></label>
              <textarea
                id="message"
                v-model="form.message"
                required
                placeholder="Enter your message"
                rows="6"
              ></textarea>
            </div>

            <button type="submit" class="btn btn-primary btn-block">
              Send Message <i class="fas fa-paper-plane"></i>
            </button>
          </form>

          <div class="form-success" v-if="formSubmitted">
            <i class="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully. We'll respond to you as soon as possible.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      formSubmitted: false
    };
  },
  methods: {
    submitForm() {
      // In a real app, you would send this data to a server
      // For this demo, we'll just show a success message
      this.formSubmitted = true;

      // Reset form for demo purposes
      setTimeout(() => {
        this.formSubmitted = false;
        this.form = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      }, 5000);
    }
  }
};
</script>

<style scoped>
.contact-page {
  padding: 30px 0 60px;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

/* Contact Info Section */
.contact-info {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.contact-info h2,
.contact-form h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  position: relative;
  padding-bottom: 10px;
}

.contact-info h2:after,
.contact-form h2:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 2px;
  background-color: #d71f1f;
}

.contact-info > p {
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
}

.info-items {
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  margin-bottom: 25px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-icon {
  width: 40px;
  height: 40px;
  background-color: rgba(215, 31, 31, 0.1);
  color: #d71f1f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  margin-right: 15px;
  flex-shrink: 0;
}

.info-content h3 {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: #333;
}

.info-content p {
  color: #666;
  margin-bottom: 3px;
}

.social-links h3 {
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #333;
}

.social-icons {
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: background-color 0.3s, color 0.3s;
}

.social-icon:hover {
  background-color: #d71f1f;
  color: white;
}

/* Contact Form Section */
.contact-form {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.required {
  color: #d71f1f;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #d71f1f;
}

.form-group textarea {
  resize: vertical;
}

.btn-block {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
}

.btn-block i {
  margin-left: 8px;
}

/* Form Success Message */
.form-success {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 30px;
}

.form-success i {
  font-size: 3rem;
  color: #43a047;
  margin-bottom: 20px;
}

.form-success h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.form-success p {
  color: #666;
  text-align: center;
  max-width: 400px;
}

@media (max-width: 992px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}
</style>
