<template>
  <div id="app" class="px-8 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <Calculator/>
    <Bar/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Vis, Calculator, Bar } from './index'

export default defineComponent({
  data() {

  },
  components: {
    Bar,
    Calculator
  },
})
</script>