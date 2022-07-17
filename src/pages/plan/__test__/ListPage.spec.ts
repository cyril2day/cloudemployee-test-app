import { mount } from '@vue/test-utils'
import { mergeWith } from 'lodash'
import { TestMountingOptions } from '../../../test'
import ListPage from '../ListPage.vue'


const createWrapper = (overrides?: TestMountingOptions) => {
   const defaultMountingOptions: TestMountingOptions = {
      global: {
         //
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
