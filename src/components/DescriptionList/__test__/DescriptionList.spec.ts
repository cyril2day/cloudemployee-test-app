import { createTestingPinia } from "@pinia/testing"
import { mount } from "@vue/test-utils"
import { mergeWith } from "lodash"
import { TestMountingOptions } from "../../../utils/test-hooks"
import DescriptionListVue from "../DescriptionList.vue"


const pinia = createTestingPinia()

const data = [{ _id: '123abc', name: 'Plan 1', description: 'Sample description only', type: 'Plan', status: 'Active' }]

const createWrapper = (overrides?: TestMountingOptions) => {
   const defaultMountingOptions: TestMountingOptions = {
      global: {
         plugins: [pinia]
      },
      props: {
         data: data
      } 
   }

   return mount(DescriptionListVue, mergeWith(defaultMountingOptions, overrides))
}


describe('Description List Component Unit Test', () => {
   beforeEach(() => {
      vi.resetModules()
   })

   test(`has single props called 'data' that accepts an array`, () => {
      expect.assertions(4)
      const wrapper = createWrapper()
      const propName = 'data'

      expect(wrapper.props(propName)).toHaveLength(1)
      expect(wrapper.props(propName)).toBeTypeOf('object')
      expect(wrapper.props(propName)).toBeInstanceOf(Array)
      expect(wrapper.props('invalidPropName')).toBe(undefined)
   })

   test('contains list items as slots when passed a data', () => {
      expect.assertions(2)
      const localData = data.concat(
         { _id: '456def', name: 'Plan 2', description: 'This is the second', type: 'Plan', status: 'Active' }
      )
      const wrapper = createWrapper({
         props: {
            data: localData
         } 
      })

      expect(wrapper.findAll('dl').length).toBe(2)
      expect(wrapper.find('dl').element.classList.contains('list__wrapper')).toBe(true)
   })

   test('has indicator for num of child icon on each list', () => {
      expect.assertions(1)
      const wrapper = createWrapper()
      
      expect(wrapper.find('.list__status-circle span').element.classList.contains('list__status-child-count')).toBe(true)
   })
})


describe('Description List Component Snapshot Test', () => {
   test('Elements and styles renders correctly', () => {
      expect.assertions(1)
      const wrapper = createWrapper()

      expect(wrapper.element).toMatchSnapshot()
   })
})
