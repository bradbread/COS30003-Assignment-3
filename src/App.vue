<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Relaxing Koala</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/order">Order</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/reserve">Reserve</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Container -->
    <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script setup>
import { Menu } from './models/MenuClass.js';
//import { Reserve } from './models/ReserveClass.js';
import { Order } from './models/OrderClass.js';
import { Payment } from './models/PaymentClass.js';
import { Receipt } from './models/ReceiptClass.js';
import MenuItems from './assets/menu.json'
</script>

<script>
export default {
  name: "App",
  data() {
        return {
            menu: MenuItems,
            cart: [],
            reservations: [],
            receiptHtml: '' // Add receiptHtml to store HTML string
        };
    },
    created() {
        this.fetchMenu();
    },
    methods: {
        fetchMenu() {
                MenuItems => MenuItems.json()
                .then(data => {
                    console.log(data)
                    this.menu = data.map(item => new Menu(item.id, item.name, item.description, item.price, item.image));
                })
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
        checkout(orderDetails) {
            if (this.cart.length === 0) {
                alert('Your cart is empty.');
                return;
            }

            const { customerInfo, paymentInfo } = orderDetails;
            paymentInfo

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

            const payment = new Payment(order.id, order.getTotal());
            const paymentStatus = payment.getStatus();

            const receipt = new Receipt(
                order.id,
                order.customerName,
                order.phoneNumber,
                order.items,
                order.getTotal(),
                paymentStatus
            );

            this.receiptHtml = receipt.displayReceipt(); // Store HTML string in receiptHtml

            alert(`Checkout successful! Total: $${order.getTotal().toFixed(2)}\nPayment Status: ${paymentStatus}`);
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
}
</script>
