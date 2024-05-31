// classes/OrderClass.js
export class Order {
    constructor(id, customerName, phoneNumber, items) {
        this.id = id;
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.items = items;
    }

    isValid() {
        return this.customerName && this.phoneNumber && this.items.length > 0;
    }

    getTotal() {
        return this.items.reduce((total, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return total + price * item.quantity;
        }, 0);
    }
}
