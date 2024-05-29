import { Menu } from './classes/MenuClass.js';
import { Reserve } from './classes/ReserveClass.js';
import { Order } from './classes/OrderClass.js';

const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            menu: [],
            cart: [],
            reservations: []
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
        checkout(customerInfo) {
            if (this.cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }

            const order = new Order(
                Date.now(),
                customerInfo.name,
                customerInfo.phone,
                this.cart
            );

            if (!order.isValid()) {
                alert('Invalid order details.');
                return;
            }

            // Save the order to orders.json (simulated here with a console log)
            console.log('Order saved:', order);

            alert(`Checkout successful! Total: $${order.getTotal().toFixed(2)}`);
            this.cart = [];
        },
        addReservation(reservation) {
            if (reservation.isValid()) {
                this.reservations.push(reservation);
                alert('Reservation successful!');
            } else {
                alert('Invalid reservation details.');
            }
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
    `
});

app.component('cart-view', {
    props: ['cart', 'removeFromCart'],
    data() {
        return {
            customerInfo: {
                name: '',
                phone: ''
            },
            paymentInfo: {
                cardNumber: '',
                expiryDate: '',
                cvv: ''
            },
            showCheckoutForm: false
        };
    },
    computed: {
        cartTotal() {
            if (this.cart.length === 0) {
                return 0;
            }
            return this.cart.reduce((total, item) => {
                return total + (parseFloat(item.price.replace('$', '')) * item.quantity);
            }, 0).toFixed(2);
        }
    },
    methods: {
        handleCheckout() {
            // Validate customer and payment information here if needed
            const orderDetails = {
                customerInfo: this.customerInfo,
                paymentInfo: this.paymentInfo
            };
            this.$emit('checkout', orderDetails);
            this.customerInfo = {
                name: '',
                phone: ''
            };
            this.paymentInfo = {
                cardNumber: '',
                expiryDate: '',
                cvv: ''
            };
            this.showCheckoutForm = false;
        }
    },
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
            <p v-if="cart.length"><strong>Total:</strong> $ {{ cartTotal }}</p>
            <button class="btn btn-primary" @click="showCheckoutForm = true">Checkout</button>
            <div v-if="showCheckoutForm" class="mt-3">
                <h3>Customer Information</h3>
                <form @submit.prevent="handleCheckout">
                    <div class="mb-2">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" v-model="customerInfo.name" required>
                    </div>
                    <div class="mb-2">
                        <label for="phone" class="form-label">Phone</label>
                        <input type="tel" class="form-control" id="phone" v-model="customerInfo.phone" required>
                    </div>
                    <h3>Payment Information</h3>
                    <div class="mb-2">
                        <label for="cardNumber" class="form-label">Card Number</label>
                        <input type="text" class="form-control" id="cardNumber" v-model="paymentInfo.cardNumber" required>
                    </div>
                    <div class="mb-2">
                        <label for="expiryDate" class="form-label">Expiry Date</label>
                        <input type="text" class="form-control" id="expiryDate" v-model="paymentInfo.expiryDate" placeholder="MM/YY" required>
                    </div>
                    <div class="mb-2">
                        <label for="cvv" class="form-label">CVV</label>
                        <input type="text" class="form-control" id="cvv" v-model="paymentInfo.cvv" required>
                    </div>
                    <button type="submit" class="btn btn-success">Submit Order</button>
                </form>
            </div>
        </div>
        <div v-else>
            <p>Your cart is empty.</p>
        </div>
    </div>
    `
});


app.component('reserve-form', {
    props: ['addReservation'],
    data() {
        return {
            name: '',
            date: '',
            time: '',
            guests: 1,
            contactInfo: ''
        };
    },
    methods: {
        submitReservation() {
            const newReservation = new Reserve(
                Date.now(), // unique id
                this.name,
                this.date,
                this.time,
                this.guests,
                this.contactInfo
            );
            this.addReservation(newReservation);
        }
    },
    template: `
    <div>
        <h2>Reserve a Table</h2>
        <form @submit.prevent="submitReservation">
            <div class="mb-2">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control form-control-sm" id="name" v-model="name" required>
            </div>
            <div class="mb-2">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control form-control-sm" id="date" v-model="date" required>
            </div>
            <div class="mb-2">
                <label for="time" class="form-label">Time</label>
                <input type="time" class="form-control form-control-sm" id="time" v-model="time" required>
            </div>
            <div class="mb-2">
                <label for="guests" class="form-label">Number of Guests</label>
                <input type="number" class="form-control form-control-sm" id="guests" v-model="guests" min="1" required>
            </div>
            <div class="mb-2">
                <label for="contactInfo" class="form-label">Contact Information</label>
                <input type="text" class="form-control form-control-sm" id="contactInfo" v-model="contactInfo" required>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Reserve</button>
        </form>
    </div>
    `
});

app.mount('#app');
