import { defineStore } from 'pinia';
import axios from 'axios';

export const useCountrieStore = defineStore({
    id: 'countrieStore',
    state: () => {
        return {
            countries: [],
            countrie: {}
        };
    },

    actions: {
        async getCountries() {
            const { data, status } = await axios.get('/all');
            this.countries = data;
            return data
        },
        async getCountrie(name) {
            const { data, status } = await axios.get(`/name/${name}`);
            this.countrie = data;
            return data
        },
    },
});
