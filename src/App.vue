<template>
  <div id="app">
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