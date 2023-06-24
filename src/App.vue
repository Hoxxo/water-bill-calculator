<template>
  <div id="app" class="px-8 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <Calculator/>
    <Bar/>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { Calculator, Bar } from './index'
import useStore from './Components/store'; // import your store

const store = useStore()
provide('store', store) // provide the store here
</script>