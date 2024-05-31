// classes/PaymentClass.js
export class Payment {
    // Now, set a payment status as always "Succesful"
    constructor(orderId, amount, status = 'Successful') {
        this.orderId = orderId;
        this.amount = amount;
        this.status = status;
    }

    getStatus() {
        return this.status;
    }
}
