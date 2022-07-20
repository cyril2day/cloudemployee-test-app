import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { mergeWith } from 'lodash'
import { TestMountingOptions } from '../../../utils/test-hooks'
import LeftFilterVue from '../LeftFilter.vue'


const pinia = createTestingPinia()

const createWrapper = (overrides?: TestMountingOptions) => {
   const defaultMountingOptions: TestMountingOptions = {
      global: {
         plugins: [pinia]
      },
      props: {
         plans: []
      }
   }

   return mount(LeftFilterVue as any, mergeWith(defaultMountingOptions, overrides))
}

describe('LeftFilter Component Unit Test', () => {
   test('sanity check', () => {
      const wrapper = createWrapper()

      console.log(wrapper.vm)
   })
})
