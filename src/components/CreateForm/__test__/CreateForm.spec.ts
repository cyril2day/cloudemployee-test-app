import { mount, VueWrapper } from "@vue/test-utils"
import { mergeWith } from "lodash"
import { TestMountingOptions } from "../../../utils/test-hooks"
import CreateFormVue from "../CreateForm.vue"


const createWrapper = (overrides?: TestMountingOptions) => {
   const defaultMountingOption: TestMountingOptions = {
      global: {
         //
      }
   }

   return mount(CreateFormVue, mergeWith(defaultMountingOption, overrides))
}

describe('Create Form Page Unit Test', () => {
   let wrapper: VueWrapper<any>

   beforeEach(() => {
      wrapper = createWrapper()   
   })

   test('Form header renders correct default title', () => {
      expect.assertions(1)
      const formTitleDefault = wrapper.find('.form-header')

      expect(formTitleDefault.html()).toContain('Create Sub Business Function')
   })

   test('input for item name is the fallback form content', () => {
      expect.assertions(1)
      const input = wrapper.findAll('input')

      expect(input.length).toBe(1)
   })

   test(`clicking submit will emit 'formSubmit' custom event together with the name and type as payload`, async() => {
      expect.assertions(2)
      const submit = wrapper.find('#formSubmit')

      expect(submit.element.nodeName).toBe('BUTTON')

      await submit.trigger('click')

      expect(wrapper.emitted('formSubmit')[0][0]).toEqual({ name: '', type: 'Sub Business Function' })
   })

   test('slot renders correctly', () => {
      expect.assertions(2)
      const wrapper = createWrapper({
         slots: {
            'form-header': '<h3>Create Activity</h3>',
            default: '<div class="sample">Sample Content</div>'
         }
      })

      const header = wrapper.find('.form-header').html()
      const custom = wrapper.find('.sample').html()

      expect(header).toContain('Create Activity')
      expect(custom).toContain('Sample Content')
   })
})


describe('Create Form Component Snapshot Test', () => {
   test('Elements and styles renders correctly', () => {
      expect.assertions(1)
      const wrapper = createWrapper()

      expect(wrapper.element).toMatchSnapshot()
   })
})
