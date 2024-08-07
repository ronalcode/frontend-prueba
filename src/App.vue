<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary navbar-dark">
      <a class="navbar-brand p-2" href="#">RG</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <RouterLink to="/" class="nav-link" href="#">Proveedores</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/productos" class="nav-link" href="#">Productos</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  <div class="container-fluid mt-3">
    <RouterView />
  </div>
</template>
