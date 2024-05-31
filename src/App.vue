<template>
  <!-- Navigation Bar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
          <a class="navbar-brand" href="/">Relaxing Koala</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                      <router-link class="nav-link" to='/order'>Order</router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link" to='/reserve'>Reserve</router-link>
                  </li>
              </ul>
          </div>
      </div>
    </nav>
    <router-view />
  </template>
  
  <script>
  export default {
    name: 'App'
  };
  </script>
  
  <style>
  @import 'bootstrap/dist/css/bootstrap.min.css';
  </style>
  