<template>
  <div id="app">
    <Model/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Calc, Model } from './index'

export default defineComponent({
  data() {

  },
  components: {
    Calc,
    Model
  }
})
</script>