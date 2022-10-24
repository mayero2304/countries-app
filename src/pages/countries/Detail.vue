<script setup>
import { onMounted, ref } from 'vue';
import { useCountrieStore } from '../../stores/countries.js';
import { useRoute } from 'vue-router';

const countrieStore = useCountrieStore();
const route = useRoute();
const countrie = ref({});

onMounted(async () => {
    await countrieStore.getCountries();
    countrieStore.countries = countrieStore.countries.filter((item) => {
        // const nameCountrieApi = item.name.common;
        // console.log(nameCountrieApi == route.params.name);
        // console.log(route.params.name);
        return item.name.common === route.params.name;
    });
});
</script>
<template>
    <main class="container grid" style="margin-top: 1rem">
        <div class="card" v-for="countrie in countrieStore.countries">
            <img :src="countrie.flags.svg" class="g-img-responsive" />
            <div class="card-content">
                <h2>{{ countrie.name.common }}</h2>
                <p><strong>Population:</strong>{{ countrie.population }}</p>
                <p><strong>Region:</strong>{{ countrie.region }}</p>
                <p v-for="capital in countrie.capital"><strong>Capital:</strong>{{ capital }}</p>
                <router-link to="/">Regressar...</router-link>
            </div>
        </div>
    </main>
</template>
<style lang="stylus" scoped>
.card-content
    background-color #FFFFFF
    padding 1.5rem

.grid
    display grid
    grid-template-columns repeat(4, minmax(0, 1fr))
    gap 2.5rem
    > .card
        border-radius 0.3rem
        > img
            border-top-left-radius 0.3rem
            border-top-rigth-radius 0.3rem
</style>
