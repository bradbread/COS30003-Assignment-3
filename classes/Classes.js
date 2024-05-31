class Person{
    constructor(name, email, password, phoneNumber, age, role) {
		if(this.constructor === Person) {
			throw new Error("Person class is of abstract type and can't be instantiated");
		};
		
        this.name = name;
		this.email = email;
		this.password = password;
        this.phoneNumber = phoneNumber;
		this.role = role;
		this.age = age;
    }

    makeOrder(order, person) {
        // Implementation of making an order
    }

    makeReservation(reservation) {
        // Implementation of making a reservation
    }

    update() {
        // Logic for updating the observer
    }
}

class Customer extends Person {
    constructor(name, email, password, phoneNumber, age) {
        super(name, email, password, phoneNumber, age, 'Customer');
		if (name && email && password && phoneNumber && age){
		// Send user information to the database
		}
    }

    provideFeedback(feedback) {
        // Send feedback to the database
    }
}

class Staff extends Person {
    constructor(name, email, password, phoneNumber, age) {
        super(name, email, password, phoneNumber, age, 'Staff');
    }

    manageReservations() {
        // Implementation of managing reservations
    }

    viewSalesReport() {
        // Implementation of viewing sales report
    }

    printReceipt() {
        // Implementation of printing receipt
    }
}

class Menu {
    constructor() {
        if (this.constructor === Menu) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    displayMenu() {
        throw new Error("Method 'displayMenu()' must be implemented.");
    }
}

class DineInMenu extends Menu {
    displayMenu() {
        // Retrieve Dine-In menu from database and display
    }
}

class TakeAwayMenu extends Menu {
    displayMenu() {
        // Retrieve Take-Away menu from database and display
    }
}

class Payment {
    constructor() {
		// Initialize an empty array to hold observers
		this.observers = [];
        if (this.constructor === Payment) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    processPayment() {
        throw new Error("Method 'processPayment()' must be implemented.");
    }

	// Method to add an observer to the list
	addObserver(observer) {
		this.observers.push(observer);
	}
	
	// Method to remove an observer from the list
	removeObserver(observer) {
		this.observers = this.observers.filter(ob => ob !== observer);
	}

	// Method to notify all observers about the temperature change
	notifyObservers() {
		this.observers.forEach(observer => {
			// Call the update method on each observer
			observer.update(this.temperature);
		});
	}
}

class CashPayment extends Payment {
    processPayment() {
        // Process cash payment

		this.notifyObservers();
    }
}

class CardPayment extends Payment {
    processPayment() {
        // Process card payment

		this.notifyObservers();
    }
}

class Order {
    constructor() {
		// Initialize an empty array to hold observers
		this.observers = [];
        if (this.constructor === Order) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    processOrder() {
        throw new Error("Method 'processOrder()' must be implemented.");
    }

	// Method to add an observer to the list
	addObserver(observer) {
		this.observers.push(observer);
	}
	
	// Method to remove an observer from the list
	removeObserver(observer) {
		this.observers = this.observers.filter(ob => ob !== observer);
	}

	// Method to notify all observers about the temperature change
	notifyObservers() {
		this.observers.forEach(observer => {
			// Call the update method on each observer
			observer.update(this.temperature);
		});
	}
}

class DineInOrder extends Order {
    processOrder() {
        // Process Dine-In order and send to database

		this.notifyObservers();
    }
}

class TakeAwayOrder extends Order {
    processOrder() {
        // Process Take-Away order and send to database

		this.notifyObservers();
    }
}

class Receipt {
    generateReceipt(order, payment) {
        // Generate receipt for the given order and payment
    }

    printReceipt() {
        // Print the receipt
    }

    sendReceiptToCustomer(customer) {
        // Send receipt to customer
    }
}

class Reservation {
    constructor(date, time, partySize, customer) {
        this.date = date;
        this.time = time;
        this.partySize = partySize;
        this.customer = customer;
    }

    manageReservations() {
        // Manage reservations
    }
}

class Table {
    constructor(tableNumber, capacity) {
        this.tableNumber = tableNumber;
        this.capacity = capacity;
        this.isAvailable = true;
    }

    
}

class Report {
    generateFinancialReport(period) {
        // Generate financial report within a certain period
    }

	generateSalesReport(period, category) {
        // Generate sales report within a certain period and category
    }
}

class MenuItem {
    constructor(name, description, price, ingredients) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.ingredients = ingredients;
		this.availability = True;
		for (const ingredient in ingredients) {
			if (ingredient == 0) {
				this.availability = False
			}
		}
    }
}

class Ingredient {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

class Delivery {

	updateStatus() {
		// Update delivery status using 3rd party delivery app API
	}

    trackDelivery() {
        // Schedule and track delivery using 3rd party delivery app API
    }

    generateSalesSummary() {
        // Generate sales summary report using 3rd party delivery app API and send it to our report database
    }
}
