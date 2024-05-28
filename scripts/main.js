// main.js
import { Menu } from './classes/MenuClass.js';

const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            menu: []
        };
    },
    created() {
        this.fetchMenu();
    },
    methods: {
        fetchMenu() {
            fetch('data/menu.json')
                .then(response => response.json())
                .then(data => {
                    this.menu = data.map(item => new Menu(item.id, item.name, item.description, item.price, item.image));
                })
                .catch(error => console.error('Error fetching menu:', error));
        }
    }
});

app.component('app-main', {
    props: ['menu'],
    template: `
    <div>
        <h1>Relaxing Koala</h1>
        <div v-if="menu && menu.length" class="row">
            <div class="col-md-4" v-for="item in menu" :key="item.id">
                <div class="card mb-4">
                    <img :src="item.image" class="card-img-top" :alt="item.name">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">{{ item.description }}</p>
                        <p class="card-text"><strong>Price:</strong> {{ item.price }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading menu...</p>
        </div>
    </div>
    `
});

app.mount('#app');
