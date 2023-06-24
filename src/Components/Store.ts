import { ref, readonly } from 'vue';

// Store
const store = {
  state: {
    isWeekData: ref(false),
  },
  toggleData() {
    this.state.isWeekData.value = !this.state.isWeekData.value;
  },
};

export default function useStore() {
  return {
    state: readonly(store.state),
    toggleData: store.toggleData.bind(store),
  };
}