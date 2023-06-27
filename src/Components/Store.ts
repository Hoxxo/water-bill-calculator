import {ref, readonly, Ref, UnwrapRef, UnwrapNestedRefs, DeepReadonly} from 'vue'

export interface Store {
  state: State
  toggleData(): void
}

interface State {
  isWeekData: Ref<UnwrapRef<boolean>>
}

type ReadonlyState = DeepReadonly<UnwrapNestedRefs<State>>

// Store
const store: Store = {
  state: {
    isWeekData: ref(false)
  },
  toggleData (): void {
    this.state.isWeekData.value = !this.state.isWeekData.value
  }
}


export default function useStore(): { toggleData: () => void; state: ReadonlyState } {
  return {
    toggleData: store.toggleData.bind(store),
    state: readonly(store.state),
  }
}
