<script setup>
import { onMounted, ref } from 'vue';
import { useCountrieStore } from '../../stores/countries.js';
import { useRoute } from 'vue-router';

const countrieStore = useCountrieStore();
const route = useRoute();
const countries = ref([]);
const borders = ref([]);
const isBorder = ref(false);

const border = async (border) => {
    await countrieStore.getCountries();
    countrieStore.countries.forEach((item) => {
        if (item.fifa === border) {
            borders.value = item;
        }
    });
    isBorder.value = true;
    console.log(borders.value);
};
onMounted(async () => {
    countries.value = await countrieStore.getCountrie(route.params.name);
});
</script>
<template>
    <main class="container grid" style="margin-top: 1rem">
        <div class="card" v-for="countrie in countries">
            <img :src="countrie.flags.svg" class="g-img-responsive" />
            <div class="card-content">
                <h2>{{ countrie.name.common }}</h2>
                <p><strong>Population:</strong> {{ countrie.population }}</p>
                <p><strong>Region:</strong> {{ countrie.region }}</p>
                <p class="border">
                    <strong>Fronteras:</strong>
                    <span
                        @click.prevent="border(countrieBorder)"
                        v-for="countrieBorder in countrie.borders"
                        ><br />{{ countrieBorder }}</span
                    >
                </p>
                <p v-for="capital in countrie.capital"><strong>Capital:</strong> {{ capital }}</p>
                <router-link to="/">Regressar...</router-link>
            </div>
        </div>
        <!-- card border -->
        <div v-if="isBorder" class="card-border">
            <img :src="borders.flags.svg" class="g-img-responsive" />
            <div class="card-content-border">
                <h2>{{ borders.name.common }}</h2>
                <p><strong>Population:</strong> {{ borders.population }}</p>
                <p><strong>Region:</strong> {{ borders.region }}</p>
                <p v-for="capital in borders.capital"><strong>Capital:</strong> {{ capital }}</p>
            </div>
        </div>
    </main>
</template>
<style lang="stylus" scoped>
.card-border
    width 400px
    display flex

.card-content
    background-color #FFFFFF
    padding 1.5rem
.card-content-border
    justify-content space-between
    align-items center
    margin-top 6rem
    margin-left 5rem

.border
    >span
       padding-left 1rem
       display block
       color #525252
       cursor pointer

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
