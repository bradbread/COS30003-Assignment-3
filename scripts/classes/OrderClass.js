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
}
