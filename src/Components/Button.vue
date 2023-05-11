<template>
  <button @click="increment">
    Click to increment: {{count}}
  </button>
</template>

<script lang="ts">
  import {defineComponent} from "vue";
  export default defineComponent({
    data() {
      return {
        count: 0
      }
    },

    methods: {
      increment() {
        ++this.count;
      }
    }
  });
</script>