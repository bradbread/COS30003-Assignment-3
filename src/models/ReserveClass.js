export class Reserve {
    constructor(id, name, date, time, guests, contactInfo) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.time = time;
        this.guests = guests;
        this.contactInfo = contactInfo;
    }

    isValid() {
        // Example validation logic
        if (!this.name || !this.date || !this.time || !this.guests || !this.contactInfo) {
            return false;
        }
        // Additional validation can be added here
        return true;
    }
}
