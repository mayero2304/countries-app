<script setup>
import { onMounted } from 'vue';
import { useCountrieStore } from '../../stores/countries.js';
import Header from '../../components/Header.vue';

const countrieStore = useCountrieStore();
onMounted(async () => {
    await countrieStore.getCountries();
});
</script>
<template>
    <Header />
    <main class="container grid">
        <article class="card" v-for="countrie in countrieStore.countries">
            <img :src="countrie.flags.svg" class="g-img-responsive" />
            <div class="card-content">
                <h2>{{ countrie.name.common }}</h2>
                <p><strong>Population:</strong>{{ countrie.population }}</p>
                <p><strong>Region:</strong>{{ countrie.region }}</p>
                <p v-for="capital in countrie.capital"><strong>Capital:</strong>{{ capital }}</p>
                <p>
                <router-link :to="{ name: 'detail', params: { name: countrie.name.common } }"
                >+Info</router-link>
                </p>
            </div>
        </article>
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
            border-top-right-radius 0.3rem
</style>
