<template>
    <label>計算する使用量</label>
  <div>
    <div class="switch-container">
      <span class="switch-text">m<sup>3</sup></span>
      <label class="switch">
        <input type="checkbox" v-model="switchValue">
        <span class="slider round"></span>
      </label>
      <span class="switch-text">L</span>
    </div>
    <input type="number" v-model="inputValue">
    <button @click="submit">送信</button>
  </div>
  <div>
    <label>口径</label>
  <select name="size" v-model="dropdownValue">
    <option value="0">選択してください</option>
    <option value="1">20mm</option>
  </select>
  </div>
  <div v-if="showFail">値を入力してください!</div>
  <div>
    <p>計算結果: {{result}}円</p>
    <p v-if="showFinal">端数調整した最終結果: {{final}}円</p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

interface Range {
  start: number;
  end: number;
}

const create_range = (start: number, end: number): Range => {
  return {
    start,
    end
  }
}

const find_entry = (input: number, map: Map<Range, number>): [number, number] => {
  let index = 0;
  for (const [range, value] of map.entries()) {
    ++index;
    if (input >= range.start && input <= range.end) {
      return [value, index];
    }
  }
}

const calculate = (n: number): number => {
  if (n < 1) {
    return n * 62.70;
  }
  const map = new Map<Range, number>;
  let total = 0;
  map.set(create_range(1, 10), 62.70);
  map.set(create_range(11, 20), 165.00);
  map.set(create_range(21, 40), 268.40);
  map.set(create_range(41, 100), 358.50);
  map.set(create_range(101, 500), 444.40);
  map.set(create_range(501, Number.MAX_SAFE_INTEGER), 485.10);

  const index = find_entry(n, map);

  let _index = index[1];
  for (const [_, value] of map.entries()) {
    _index -= 1;
    if (_index === 0) {
      break;
    }
    total += value * 10;
  }
  total += index[0] * (n - 10 * (index[1] - 1));
  return total;
}

const convert_litre = (n: number) => {
  return n / 1000;
}

const get_select_value = (selection: string) => {
  let map = new Map<String, number>;
  map.set('1', 979.00);

  return map.get(selection);
}

export default defineComponent({
  data() {
    return {
      inputValue: 0,
      result: 0,
      dropdownValue: "",
      showFail: false,
      showFinal: false,
      final: 0,
      switchValue: false
    }
  },

  methods: {
    submit() {
      this.showFail = this.inputValue === 0;

      let value = this.switchValue ? convert_litre(this.inputValue) : this.inputValue;
      this.result = calculate(value) + get_select_value(this.dropdownValue);
      this.final = Math.floor(this.result / 10) * 10;
      this.showFinal = true;
    }
  }
})

</script>

<style>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 40px; /* Reduced width */
  height: 20px; /* Reduced height */
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px; /* Reduced height */
  width: 16px; /* Reduced width */
  left: 2px; /* Adjusted left position */
  bottom: 2px; /* Adjusted bottom position */
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
    /* Adjusted translation distance */
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 20px; /* Adjusted border radius */
}

.slider.round:before {
  border-radius: 50%;
}

/* Add this to your existing CSS */
.switch-container {
  display: inline-flex;
  align-items: center;
}

.switch-text {
  margin: 0 8px; /* Adjust this value to add more or less space around the text */
}
</style>