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
        const itemsHtml = this.items.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price}</td>
            </tr>
        `).join('');

        return `
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title text-center">Relaxing Koala Restaurant</h2>
                    <h5 class="text-center">Receipt</h5>
                    <p><strong>Order ID:</strong> ${this.orderId}</p>
                    <p><strong>Customer Name:</strong> ${this.customerName}</p>
                    <p><strong>Phone Number:</strong> ${this.phoneNumber}</p>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                    </table>
                    <p><strong>Total Amount:</strong>$ ${this.totalAmount.toFixed(2)}</p>
                    <p><strong>Payment Status:</strong> ${this.paymentStatus}</p>
                    <p class="text-center">Thank you for your order!</p>
                </div>
            </div>
        `;
    }

    displayReceipt() {
        return this.generateReceipt();
    }

    printReceipt() {
        const receiptWindow = window.open('', 'PRINT', 'height=400,width=600');
        receiptWindow.document.write('<html><head><title>Receipt</title>');
        receiptWindow.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css">');
        receiptWindow.document.write('</head><body>');
        receiptWindow.document.write(this.generateReceipt());
        receiptWindow.document.write('</body></html>');
        receiptWindow.document.close();
        receiptWindow.print();
    }

    sendReceiptToCustomer() {
        console.log(`Sending receipt to ${this.customerName} at ${this.phoneNumber}...`);
        setTimeout(() => {
            console.log('Receipt sent successfully!');
            alert('Receipt sent to your phone number successfully!');
        }, 1000);
    }
}
