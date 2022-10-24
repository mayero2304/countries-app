<template>
    <section class="container my-2">
        <div>
            <form class="form-search">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                <input
                    @focus="countrieStore.getCountries()"
                    v-model="countrie"
                    type="text"
                    placeholder="Search for a country"
                />
            </form>
        </div>

        <div>
            <select v-model="selected" class="select-filter">
                <option value="">Filter by Region</option>
                <option value="Africa">África</option>
                <option value="Americas">América</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceanía</option>
            </select>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useCountrieStore } from '../stores/countries.js';

const countrie = ref('');
const selected = ref('');
const countrieStore = useCountrieStore();

watch(countrie, (name) => {
    if (!name) {
        countrieStore.getCountries();
    }
    countrieStore.countries = countrieStore.countries.filter((item) => {
        const nameCountrieApi = item.name.common.toLowerCase();
        if (nameCountrieApi.indexOf(name.toLocaleLowerCase()) != -1) {
            return item;
        }
    });
});

watch(selected, async (name) => {
    if (name) {
        await countrieStore.getCountries();
    }
    countrieStore.countries = countrieStore.countries.filter((item) => {
        const nameRegionApi = item.region;
        if (nameRegionApi.indexOf(name) != -1) {
            return item;
        }
    });
});

onMounted(async () => {
    await countrieStore.getCountries();
});
</script>

<style lang="stylus" scoped>
.container
    display flex
    justify-content space-between
    align-items center

.form-search
    padding: 1rem;
    background: #f1f1f1;
    > i
        color #FFFFFF
        opacity 0.5
    > input
        width 300px
        border none
        outline none
        background-color #ffffff
        margin-left 1rem
        color #000000
.select-filter
    position relative
    width 200px
</style>
