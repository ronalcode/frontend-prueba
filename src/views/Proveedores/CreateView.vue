<script setup lang="ts">
import SaveButton from '@/components/SaveButton.vue';
import { sendRequest, show_alert } from '@/helpers/functions';
import type { Provider } from '@/interfaces/Provider';
import { ref } from 'vue';

const provider = ref<Provider>({
  id: 0,
  nombre: '',
  direccion: '',
  telefono: '',
  email: '',
});

const saveProvider = () => {
  if (provider.value.nombre.trim() === '') {
    show_alert('Escribe el nombre', 'warning', 'nombre');
  } else if (provider.value.direccion.trim() === '') {
    show_alert('Escribe la dirección', 'warning', 'direccion');
  } else if (provider.value.telefono.trim() === '') {
    show_alert('Escribe el teléfono', 'warning', 'telefono');
  } else {
    let params = {
      nombre: provider.value.nombre,
      direccion: provider.value.direccion,
      telefono: provider.value.telefono,
      email: provider.value.email,
    };
    sendRequest('POST', params, '/proveedores', 'Nuevo proveedor agregado correctamente');
  }
};
</script>

<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">Nuevo proveedor</div>
        <div class="card-body">
          <form @submit.prevent="saveProvider">
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
              <input
                type="text"
                id="nombre"
                class="form-control"
                maxlength="50"
                placeholder="Nombre"
                v-model="provider.nombre"
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-address-book"></i></span>
              <input
                type="text"
                id="direccion"
                class="form-control"
                maxlength="150"
                placeholder="Dirección"
                v-model="provider.direccion"
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-phone"></i></span>
              <input
                type="text"
                id="telefono"
                class="form-control"
                maxlength="10"
                placeholder="Teléfono"
                v-model="provider.telefono"
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
              <input
                type="email"
                id="email"
                class="form-control"
                maxlength="199"
                v-model="provider.email"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <SaveButton />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
