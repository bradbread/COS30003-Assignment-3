// classes/ReceiptClass.js
export class Receipt {
    constructor(orderId, customerName, phoneNumber, items, totalAmount, paymentStatus) {
        this.orderId = orderId;
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.items = items;
        this.totalAmount = totalAmount;
        this.paymentStatus = paymentStatus;
    }

    generateReceipt() {
        return `
            Receipt for Order #${this.orderId}
            -------------------------
            Customer Name: ${this.customerName}
            Phone Number: ${this.phoneNumber}
            Items:
            ${this.items.map(item => `${item.name} (x${item.quantity}) - $${item.price}`).join('\n')}
            -------------------------
            Total Amount: $${this.totalAmount.toFixed(2)}
            Payment Status: ${this.paymentStatus}
            -------------------------
            Thank you for your order!
        `;
    }
}
