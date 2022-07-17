import { MountingOptions } from "@vue/test-utils"
import { setActivePinia, createPinia } from 'pinia'

export type TestMountingOptions = MountingOptions<unknown>

export const StoreBeforeEach = () => {
   beforeEach(() => {
      setActivePinia(createPinia())
   })
}
