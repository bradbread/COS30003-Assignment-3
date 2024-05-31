<template>
    <div>
      <h1>Relaxing Koala</h1>
      <div v-if="menu && menu.length" class="row">
        <div class="col-md-4" v-for="item in menu" :key="item.id">
          <div class="card mb-4">
            <img :src="item.image" class="card-img-top" :alt="item.name">
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p>{{ item.description }}</p>
              <p class="card-text"><strong>Price:</strong> {{ item.price }}</p>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <button class="btn btn-secondary" @click="decrementQuantity(item.id)">-</button>
                <span>{{ quantities[item.id] || 1 }}</span>
                <button class="btn btn-secondary" @click="incrementQuantity(item.id)">+</button>
              </div>
              <button class="btn btn-primary" @click="handleAddToCart(item)">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading menu...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainComponent',
    props: ['menu', 'addToCart'],
    data() {
      return {
        quantities: {}
      };
    },
    methods: {
      incrementQuantity(id) {
        if (!this.quantities[id]) {
          this.quantities[id] = 1;
        } else {
          this.quantities[id]++;
        }
      },
      decrementQuantity(id) {
        if (this.quantities[id] > 1) {
          this.quantities[id]--;
        }
      },
      handleAddToCart(item) {
        const quantity = this.quantities[item.id] || 1;
        this.addToCart(item, quantity);
        this.quantities[item.id] = 1; // Reset quantity after adding to cart
      }
    }
  };
  </script>
  