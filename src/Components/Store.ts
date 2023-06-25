import {ref, readonly, Ref, UnwrapRef, UnwrapNestedRefs, DeepReadonly} from 'vue'

export interface Store {
  state: { isWeekData: Ref<UnwrapRef<boolean>> }

  toggleData(): void
}

// Store
const store: Store = {
  state: {
    isWeekData: ref(false)
  },
  toggleData () {
    this.state.isWeekData.value = !this.state.isWeekData.value
  }
}

export default function useStore(): { toggleData: () => void; state: DeepReadonly<UnwrapNestedRefs<{ isWeekData: Ref<UnwrapRef<boolean>> }>> } {
  return {
    state: readonly(store.state),
    toggleData: store.toggleData.bind(store)
  }
}
