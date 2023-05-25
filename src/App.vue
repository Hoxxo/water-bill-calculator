<template>
  <div id="app">
    <Vis/>
    <Calculator/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Vis, Calculator } from './index'

export default defineComponent({
  data() {

  },
  components: {
    Vis,
    Calculator
  },
})
</script>