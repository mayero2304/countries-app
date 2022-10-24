<template>
    <nav class="navbar">
        <div class="container navbar-content">
            <h3>Where in te world?</h3>
            <button class="dark-mode">
                <font-awesome-icon :icon="['far', 'moon']" />
                Dark Mode
            </button>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';
</script>

<style lang="stylus" scoped>
.dark-mode
    background-color #ffffff;
    opacity 1
    transition 0.3s
    color #000000
    border none;
    cursor pointer
    outline none
.navbar
    background-color: #FFFFFF
.navbar-content
    display: flex
    justify-content: space-between;
    align-items: center
</style>
