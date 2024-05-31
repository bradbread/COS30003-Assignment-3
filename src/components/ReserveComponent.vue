<script setup>
    import Reserve from '../models/ReserveClass.js'
</script>


<script>
    export default {
        name: 'ReserveComponent',
        props: ['addReservation'],
    data() {
        return {
            name: '',
            date: '',
            time: '',
            guests: 1,
            contactInfo: ''
        };
    },
    methods: {
        submitReservation() {
            const newReservation = new Reserve(
                Date.now(), // unique id
                this.name,
                this.date,
                this.time,
                this.guests,
                this.contactInfo
            );
            this.addReservation(newReservation);
        }
    }
    }
</script>

<template>
    <div>
        <h2>Reserve a Table</h2>
        <form @submit.prevent="submitReservation">
            <div class="mb-2">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control form-control-sm" id="name" v-model="name" required>
            </div>
            <div class="mb-2">
                <label for="date" class="form-label">Date</label>
                <input type="date" class="form-control form-control-sm" id="date" v-model="date" required>
            </div>
            <div class="mb-2">
                <label for="time" class="form-label">Time</label>
                <input type="time" class="form-control form-control-sm" id="time" v-model="time" required>
            </div>
            <div class="mb-2">
                <label for="guests" class="form-label">Number of Guests</label>
                <input type="number" class="form-control form-control-sm" id="guests" v-model="guests" min="1" required>
            </div>
            <div class="mb-2">
                <label for="contactInfo" class="form-label">Contact Information</label>
                <input type="text" class="form-control form-control-sm" id="contactInfo" v-model="contactInfo" required>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Reserve</button>
        </form>
    </div>
</template>