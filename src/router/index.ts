import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import IndexProv from '../views/Proveedores/IndexView.vue';
import CreateProv from '../views/Proveedores/CreateView.vue';
import EditProv from '../views/Proveedores/EditView.vue';
import IndexProduct from '../views/Productos/IndexView.vue';
import CreateProduct from '../views/Productos/CreateView.vue';
import EditProduct from '../views/Productos/EditView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IndexProv,
    },
    {
      path: '/proveedores/create',
      name: 'create-prov',
      component: CreateProv,
    },
    {
      path: '/proveedores/edit/:id',
      name: 'edit-prov',
      component: EditProv,
    },
    {
      path: '/productos',
      name: 'products',
      component: IndexProduct,
    },
    {
      path: '/productos/create',
      name: 'create-product',
      component: CreateProduct,
    },
    {
      path: '/productos/edit/:id',
      name: 'edit-product',
      component: EditProduct,
    },
  ],
});

export default router;
