// main.js
import { Menu } from './classes/MenuClass.js';

const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            menu: [],
            cart: []
        };
    },
    created() {
        this.fetchMenu();
    },
    methods: {
        fetchMenu() {
            fetch('data/menu.json')
                .then(response => response.json())
                .then(data => {
                    this.menu = data.map(item => new Menu(item.id, item.name, item.description, item.price, item.image));
                })
                .catch(error => console.error('Error fetching menu:', error));
        },
        addToCart(item, quantity) {
            const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                this.cart.push({ ...item, quantity });
            }
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
        },
        checkout() {
            alert('Checkout successful!');
            this.cart = [];
        }
    }
});

app.component('app-main', {
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
    },
    template: `
    <div>
        <h1>Relaxing Koala</h1>
        <div v-if="menu && menu.length" class="row">
            <div class="col-md-4" v-for="item in menu" :key="item.id">
                <div class="card mb-4">
                    <img :src="item.image" class="card-img-top" :alt="item.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">{{ item.description }}</p>
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
    `
});

app.component('cart-view', {
    props: ['cart', 'removeFromCart', 'checkout'],
    template: `
    <div>
        <h2>Your Cart</h2>
        <div v-if="cart.length">
            <ul class="list-group mb-3">
                <li class="list-group-item" v-for="(item, index) in cart" :key="index">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5>{{ item.name }}</h5>
                            <p>{{ item.description }}</p>
                            <p><strong>Price:</strong> {{ item.price }}</p>
                            <p><strong>Quantity:</strong> {{ item.quantity }}</p>
                        </div>
                        <button class="btn btn-danger" @click="removeFromCart(index)">Remove</button>
                    </div>
                </li>
            </ul>
            <button class="btn btn-success" @click="checkout">Checkout</button>
        </div>
        <div v-else>
            <p>Your cart is empty.</p>
        </div>
    </div>
    `
});

app.mount('#app');
