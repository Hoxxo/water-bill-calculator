<template>
  <div id="app">
    <Vis/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Calc, Model, Vis } from './index'

export default defineComponent({
  data() {

  },
  components: {
    Calc,
    Model,
    Vis
  }
})
</script>