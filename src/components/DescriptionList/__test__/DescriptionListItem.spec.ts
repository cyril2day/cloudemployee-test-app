import { mount, VueWrapper } from "@vue/test-utils"
import { mergeWith } from "lodash"
import { TestMountingOptions } from "../../../utils/test-hooks"
import DescriptionListItemVue from "../DescriptionListItem.vue"


const createWrapper = (overrides?: TestMountingOptions) => {
   const defaultMountingOptions: TestMountingOptions = {
      global: {
         //
      }
   }

   return mount(DescriptionListItemVue, mergeWith(defaultMountingOptions, overrides))
}

describe('Description List Item Component Unit Test', () => {
   let wrapper: VueWrapper<any>

   beforeEach(() => {
      wrapper = createWrapper()
   })

   afterEach(() => {
      if (wrapper)
         wrapper.unmount()
   })

   test('component accepts five(5) slots)', () => {
      expect.assertions(1)
      const defaultNumOfProps = 5


      expect(Object.keys(wrapper.props()).length).toBe(defaultNumOfProps)
   })

   test('width props default value is 80', () => {
      expect.assertions(2)

      expect(wrapper.props('width')).toBe(80)
      expect(typeof wrapper.props('width')).toBe('number')
   })

   test('trim method works correctly', () => {
      expect.assertions(2)
      const sampleString = 'this is a long string',
         stringTrimmed = 'this ...',
         wrapper = createWrapper({
         props: {
            label: 'Sample Long String',
            value: sampleString,
            trim: 5 
         }
      })

      expect(wrapper.find('dd').element.textContent).toBe(stringTrimmed)
      expect(wrapper.find('dd').element.textContent?.length).toBe(stringTrimmed.length)
   })

   test('renders label and value props', () => {
      expect.assertions(2)
      const expectedLabel = 'Sample Label'
      const expectedParagraph = 'This is a sample paragraph'
      const wrapper = createWrapper({
         props: {
            label: expectedLabel,
            value: expectedParagraph
         }
      })
      
      expect(wrapper.find('dt').element.textContent).toBe(expectedLabel)
      expect(wrapper.find('dd').element.textContent).toBe(expectedParagraph)
   })
})


describe('Description List Item Component Snapshot Test', () => {
   test('Elements and styles renders correctly', () => {
      expect.assertions(1)
      const wrapper = createWrapper()

      expect(wrapper.element).toMatchSnapshot()
   })
})
