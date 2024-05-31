<template>
    <div class="container mt-5">
      <v-app>
        <v-main>
          <div class="row">
            <div class="col-md-8">
              <MainComponent :menu="menu" :add-to-cart="addToCart"></MainComponent>
              <!-- <div class="mt-4 mb-5">
                <ReserveForm :add-reservation="addReservation"></ReserveForm>
              </div> -->
            </div>
            <div class="col-md-4">
              <CartComponent :cart="cart" :remove-from-cart="removeFromCart" @checkout="checkout"></CartComponent>
              <ReceiptView :receipt-html="receiptHtml"></ReceiptView>
            </div>
          </div>
        </v-main>
      </v-app>
    </div>
  </template>
  
  <script>
  import MainComponent from './MainComponent.vue';
  import CartComponent from './CartComponent.vue';
  // import ReserveForm from './ReserveForm.vue';
  import ReceiptView from './ReceiptComponent.vue';
  import { Menu } from '../models/MenuClass.js';
  import { Order } from '../models/OrderClass.js';
  import { Payment } from '../models/PaymentClass.js';
  import { Receipt } from '../models/ReceiptClass.js';
  
  export default {
    name: 'MenuComponent',
    components: {
      MainComponent,
      CartComponent,
      ReceiptView
    },
    data() {
      return {
        menu: [],
        cart: [],
        reservations: [],
        receiptHtml: ''
      };
    },
    created() {
      this.fetchMenu();
    },
    methods: {
      fetchMenu() {
        fetch('./data/menu.json')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
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
      checkout(orderDetails) {
        if (this.cart.length === 0) {
          alert('Your cart is empty.');
          return;
        }
  
        const { customerInfo } = orderDetails;
  
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
  };
  </script>
  