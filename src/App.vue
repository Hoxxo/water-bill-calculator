<template>
  <div id="app">
    <Calc/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Calc } from './index'

export default defineComponent({
  data() {

  },
  components: {
    Calc
  }
})
</script>