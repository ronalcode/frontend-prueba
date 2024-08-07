<script setup lang="ts">
import SaveButton from '@/components/SaveButton.vue';
import { restApi } from '@/composables/axios';
import { sendRequest, show_alert } from '@/helpers/functions';
import type { Product } from '@/interfaces/Product';
import type { Provider } from '@/interfaces/Provider';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const product = ref<Product>({
  id: 0,
  nombre: '',
  descripcion: '',
  precio: 0,
  cantidad: 0,
  proveedor: {
    id: 0,
    nombre: '',
  },
});

const providers = ref<Provider[] | null>(null);

const getProduct = (id: number) => {
  restApi.get(`/productos/${id}`).then((response) => {
    product.value.nombre = response.data.nombre;
    product.value.descripcion = response.data.descripcion;
    product.value.precio = response.data.precio;
    product.value.cantidad = response.data.cantidad;
    if (product.value.proveedor) product.value.proveedor.id = response.data.proveedor.id;
  });
};

const selectedProveedorId = computed(() => {
  if (product.value.proveedor) return product.value.proveedor.id;
  else return null;
});

const saveProduct = () => {
  if (product.value.nombre.trim() === '') {
    show_alert('Escribe el nombre', 'warning', 'nombre');
  } else if (product.value.descripcion.trim() === '') {
    show_alert('Escribe una descripción no mayor a 200 caracteres', 'warning', 'descripcion');
  } else {
    let params = {
      id: product.value.id,
      nombre: product.value.nombre,
      descripcion: product.value.descripcion,
      precio: product.value.precio,
      cantidad: product.value.cantidad,
      proveedor: product.value.proveedor
        ? {
            id: product.value.proveedor.id,
          }
        : undefined,
    };
    console.log(params);
    sendRequest('PUT', params, '/productos', 'Producto modificado correctamente', '/productos');
  }
};

const getProviders = async () => {
  try {
    const response = await restApi.get<Provider[]>('/proveedores');
    providers.value = response.data;
  } catch (error) {
    throw 'Url no encontrado';
  }
};

onMounted(() => {
  getProviders();
  const route = useRoute();
  product.value.id = Number(route.params.id);
  getProduct(product.value.id);
});
</script>

<template>
  <div class="row mt-3">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-dark text-white text-center">Editar producto</div>
        <div class="card-body">
          <form @submit.prevent="saveProduct">
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
              <input
                type="text"
                id="nombre"
                class="form-control"
                maxlength="50"
                placeholder="Nombre del producto"
                v-model="product.nombre"
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-comment"></i></span>
              <input
                type="text"
                id="descripcion"
                class="form-control"
                maxlength="200"
                placeholder="Descripción del producto"
                v-model="product.descripcion"
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-dollar-sign"></i></span>
              <input
                type="number"
                id="precio"
                class="form-control"
                step="0.01"
                placeholder="Precio"
                v-model="product.precio"
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-hashtag"></i></span>
              <input
                type="number"
                id="cantidad"
                class="form-control"
                step="1"
                placeholder="Cantidad"
                v-model="product.cantidad"
                required
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text"><i class="fa-solid fa-truck-fast"></i></span>
              <select
                name="provedor"
                id="proveedor"
                class="form-select"
                v-model="selectedProveedorId"
              >
                <option value="" selected disabled>Seleccione un proveedor</option>
                <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                  {{ provider.nombre }}
                </option>
              </select>
            </div>
            <SaveButton />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
