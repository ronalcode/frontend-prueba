<script setup lang="ts">
import MyTable from '@/components/MyTable.vue';
import { restApi } from '@/composables/axios';
import { confirm } from '@/helpers/functions';
import type { Product } from '@/interfaces/Product';
import { onMounted, ref } from 'vue';

const products = ref<Product[] | null>(null);

const getProducts = async () => {
  try {
    const response = await restApi.get<Product[]>('/productos');
    products.value = response.data;
  } catch (error) {
    throw 'Url no encontrado';
  }
};

const deleteProduct = (id: number, name: string) => {
  let url = `/productos/${id}`;
  confirm(id, url, name, '/productos');
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <div class="row mt-4">
    <div class="col-lg-8 offset-lg-2">
      <div class="d-flex justify-content-between mb-3">
        <h3>Lista de productos</h3>
        <RouterLink to="/productos/create" class="btn btn-dark"
          ><i class="fa-solid fa-edit"></i>Nuevo producto</RouterLink
        >
      </div>
      <MyTable>
        <template #thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Proveedor</th>
            <th>Acciones</th>
          </tr>
        </template>
        <template #default>
          <tr v-for="(product, i) in products" :key="product.id">
            <td>{{ i + 1 }}</td>
            <td>{{ product.nombre }}</td>
            <td>{{ product.descripcion }}</td>
            <td>{{ product.precio }}</td>
            <td>{{ product.cantidad }}</td>
            <td>{{ product.proveedor ? product.proveedor.nombre : 'No asignado' }}</td>
            <td>
              <RouterLink :to="{ path: '/productos/edit/' + product.id }" class="btn btn-warning">
                <i class="fa-solid fa-edit"></i> </RouterLink
              >&nbsp;
              <button class="btn btn-danger" @click="deleteProduct(product.id, product.nombre)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </template>
      </MyTable>
    </div>
  </div>
</template>
