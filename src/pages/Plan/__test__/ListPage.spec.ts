import { mount, VueWrapper } from '@vue/test-utils'
import { mergeWith } from 'lodash'
import { TestMountingOptions } from '../../../utils/test-hooks'
import { createTestingPinia } from '@pinia/testing'
import ListPage from '../ListPage.vue'
import usePlanStore from '../../../stores/plan'


vi.mock('../../../api/plan')
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
   let wrapper: VueWrapper<any>

   beforeEach(() => {
      wrapper = createWrapper()
   })

   afterEach(() => {
      if (wrapper)
         wrapper.unmount()

      vi.clearAllMocks()
      vi.resetModules()
   })

   test('fetched data on before mount', async() => {
      expect.assertions(1)
      const { Fetch } = usePlanStore()

      expect(Fetch).toHaveBeenCalledTimes(1)
   })

   test('renders "No Data" if no plans data is fetched', () => {
      expect.assertions(1)
      usePlanStore().plans = []

      expect(wrapper.find('.plan-list__no-content').element.textContent).toBe('No Data')
   })

   test('search input element is present on the page', () => {
      expect.assertions(2)
      const input = wrapper.find('input').element

      expect(input.nodeName).toBe('INPUT')
      expect(input).toHaveProperty('autofocus')
   })

   test('search feature works correctly', () => {
      console.log(usePlanStore().$state.plans)
   })
})


describe('List Page Component Snapshot Test', () => {
   test('Elements and styles renders correctly', () => {
      expect.assertions(1)
      const wrapper = createWrapper()

      expect(wrapper.element).toMatchSnapshot()
   })
})
