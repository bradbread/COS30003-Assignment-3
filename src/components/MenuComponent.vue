<template>
    <!-- Main Container -->
    <div class="container mt-5" id="app">
        <v-app>
            <v-main>
                <div class="row">
                    <!-- Menu and Cart Container -->
                    <div class="col-md-8">
                        <MainComponent :menu="menu" :add-to-cart="addToCart"></MainComponent>
                        <!-- Reserve Form Container -->
                        <div class="mt-4 mb-5">
                            <reserve-form :add-reservation="addReservation"></reserve-form>
                        </div>
                    </div>
                    <!-- Cart and Receipt Container -->
                    <div class="col-md-4">
                        <CartComponent :cart="cart" :remove-from-cart="removeFromCart" @checkout="checkout"></CartComponent>
                        <receipt-view :receipt-html="receiptHtml"></receipt-view>
                    </div>
                </div>
            </v-main>
        </v-app>
    </div>
</template>

<script setup>
import MainComponent from './components/MainComponent.vue';
import CartComponent from './components/CartComponent.vue'
import { Menu } from './models/MenuClass.js';
//import { Reserve } from './models/ReserveClass.js';
import { Order } from './models/OrderClass.js';
import { Payment } from './models/PaymentClass.js';
import { Receipt } from './models/ReceiptClass.js';
import MenuItems from './assets/menu.json'
</script>