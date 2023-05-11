<template>
  <button @click="change_colour">Change colour</button>
  <h1 :class="returnClass">Hello world!</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      returnClass: 'title'
    }
  },

  methods: {
    change_colour() {
      this.returnClass = this.returnClass == 'title' ? 'title-changed' : 'title';
    }
  }
})
</script>

<style>
.title {
  color: red;
}

.title-changed {
  color: blue;
}
</style>