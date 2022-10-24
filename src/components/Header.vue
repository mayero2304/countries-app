<template>
    <section class="container my-2">
        <div>
            <form class="form-search">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                <input
                    @focus="focus"
                    v-model="countrie"
                    type="text"
                    placeholder="Search for a country"
                />
            </form>
        </div>

        <div>
            <v-select
                style="width: 200px"
                v-model="selected"
                :options="[
                    { label: 'Select by Region', code: 'select' },
                    { label: 'África', code: 'Africa' },
                    { label: 'Ámerica', code: 'Americas' },
                    { label: 'Asia', code: 'Asia' },
                    { label: 'Europa', code: 'Europe' },
                    { label: 'Oceania', code: 'Oceania' },
                ]"
            ></v-select>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useCountrieStore } from '../stores/countries.js';
import 'vue-select/dist/vue-select.css';

const countrie = ref('');
const selected = ref('Select by Region');
const countrieStore = useCountrieStore();

const focus = () => {
    countrieStore.getCountries();
    selected.value = 'Select by Region';
};
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
    if (name.code) {
        await countrieStore.getCountries();
    }
    countrieStore.countries = countrieStore.countries.filter((item) => {
        const nameRegionApi = item.region;
        if (nameRegionApi.indexOf(name.code) != -1) {
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
