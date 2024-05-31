
<script>
export default {
    name: "CartComponent",
    props: ['cart', 'removeFromCart', 'checkout'],
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
        }
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
    }
}
</script>

<template>
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
</template>