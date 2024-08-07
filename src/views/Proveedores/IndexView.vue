<script setup lang="ts">
import MyTable from '@/components/MyTable.vue';
import { restApi } from '@/composables/axios';
import { confirm } from '@/helpers/functions';
import type { Provider } from '@/interfaces/Provider';
import { onMounted, ref } from 'vue';

const providers = ref<Provider[] | null>(null);

const getProviders = async () => {
  try {
    const response = await restApi.get<Provider[]>('/proveedores');
    providers.value = response.data;
  } catch (error) {
    throw 'Url no encontrado';
  }
};

const deleteProvider = (id: number, name: string) => {
  let url = `/proveedores/${id}`;
  confirm(id, url, name);
};

onMounted(() => {
  getProviders();
});
</script>

<template>
  <div class="row mt-4">
    <div class="col-lg-8 offset-lg-2">
      <div class="d-flex justify-content-between mb-3">
        <h3>Lista de proveedores</h3>
        <RouterLink to="/proveedores/create" class="btn btn-dark"
          ><i class="fa-solid fa-edit"></i>Nuevo proveedor</RouterLink
        >
      </div>
      <MyTable>
        <template #thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </template>
        <template #default>
          <tr v-for="(provider, i) in providers" :key="provider.id">
            <td>{{ i + 1 }}</td>
            <td>{{ provider.nombre }}</td>
            <td>{{ provider.direccion }}</td>
            <td>{{ provider.telefono }}</td>
            <td>{{ provider.email }}</td>
            <td>
              <RouterLink
                :to="{ path: '/proveedores/edit/' + provider.id }"
                class="btn btn-warning"
              >
                <i class="fa-solid fa-edit"></i> </RouterLink
              >&nbsp;
              <button class="btn btn-danger" @click="deleteProvider(provider.id, provider.nombre)">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </template>
      </MyTable>
    </div>
  </div>
</template>
