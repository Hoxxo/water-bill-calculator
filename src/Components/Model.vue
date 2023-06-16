<template>
  <div>
    <input type="number" v-model="n1">
    <input type="number" v-model="n2">
    <button @click="send_data">Predict</button>
  </div>
  <p>Result: {{result}}</p>
</template>

<script lang="ts">
  import { defineComponent } from "vue";

  const send_data = async () => {
    const response = await fetch("http://localhost:5000/predict", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: [this.n1, this.n2]
      })
    });

    if (response.ok) {
      const data = await response.json();
      this.result = data.prediction;
    } else {
      console.log('Error:', response.status, response.statusText);
    }
  }

  export default defineComponent({
    data() {
      return {
        n1: 0,
        n2: 0,
        result: 0,
      }
    },
    methods: {
      send_data: send_data
    }
  })
</script>