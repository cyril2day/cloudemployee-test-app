import { mount } from '@vue/test-utils'
import { mergeWith } from 'lodash'
import { TestMountingOptions } from '../../../utils/test-hooks'
import { createTestingPinia } from '@pinia/testing'
import ListPage from '../ListPage.vue'

const pinia = createTestingPinia()

const createWrapper = (overrides?: TestMountingOptions) => {
   const defaultMountingOptions: TestMountingOptions = {
      global: {
         plugins: [pinia]
      }
   }
   return mount(ListPage as any, mergeWith(defaultMountingOptions, overrides))
}

describe('List Page Unit Test', () => {
   test('sanity check', () => {
      const wrapper = createWrapper()

      console.log(wrapper)
   })
})
