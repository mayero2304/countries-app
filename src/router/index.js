import { createRouter, createWebHistory } from 'vue-router';
import Countries  from '@/pages/countries/List.vue';
import Detail from '@/pages/countries/Detail.vue';

const routes = [
    { path: '/', component: Countries },
    { path: '/detail/:name', name: 'detail', component: Detail },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
