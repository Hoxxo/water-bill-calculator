<template>
  <div id="app">
    <Calculator/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Calc, Model, Vis, Calculator } from './index'

export default defineComponent({
  data() {

  },
  components: {
    Calc,
    Model,
    Vis,
    Calculator
  },
})
</script>