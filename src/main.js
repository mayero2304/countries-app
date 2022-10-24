import VSelect from 'vue-select';
import { createApp } from 'vue';
import './styles/index.styl';
import App from './App.vue';
import { createPinia } from 'pinia';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-regular-svg-icons';


library.add(faMoon,faMagnifyingGlass)
axios.defaults.baseURL = "https://restcountries.com/v3.1";

import router from '@/router/index.js';

const pinia = createPinia();
createApp(App).use(pinia).use(router).component('v-select', VSelect).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
