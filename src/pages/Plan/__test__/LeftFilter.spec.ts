import { TestMountingOptions } from '../../../utils/test-hooks'
import LeftFilter from '../LeftFilter.vue'


const createWrapper = (overrides?: TestMountingOptions) => {
   const defaultMountingOptions: TestMountingOptions = {
      global: {
         //
      }
   }
   return mount(LeftFilter, mergeWith(defaultMountingOptions, overrides))
}

describe('LeftFilter Component Unit Test', () => {
   test('sanity check', () => {
      return
   })
})
