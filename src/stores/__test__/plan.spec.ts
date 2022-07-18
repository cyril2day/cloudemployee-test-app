import { storeToRefs } from 'pinia'
import { getPlans } from '../../api/plan'
import { StoreBeforeEach } from '../../utils/test-hooks'
import usePlanStore from '../plan'

const NUM_EXPECTED_PLAN = 2
const NUM_EXPECTED_CHILDPLAN = 8

vi.mock('src/api/plan')

StoreBeforeEach()

describe('Plan Store Unit Test', () => {
   beforeEach(async() => {
      await usePlanStore().Fetch()
   })

   afterEach(() => {
      vi.clearAllMocks()
      vi.resetModules()
   })

   test('Fetches list of plans from api', () => {
      expect.assertions(1)

      expect(getPlans).toHaveBeenCalledTimes(1)
   })

   test('Fetch action saves flattened array of plans and plan children to store', async() => {
      expect.assertions(1)
      const { flattenedData } = storeToRefs(usePlanStore())

      expect(flattenedData.value).toHaveLength(10)
   })

   test('GetPlans action works as expected', () => {
      expect.assertions(1)
      const { flattenedData, plans } = storeToRefs(usePlanStore())

      usePlanStore().GetPlans(flattenedData.value as any)

      expect(plans.value).toHaveLength(NUM_EXPECTED_PLAN)
   })

   test('GetPlanChildren action works as expected', () => {
      expect.assertions(1)
      const { flattenedData, planChildren } = storeToRefs(usePlanStore())

      usePlanStore().GetPlanChildren(flattenedData.value as any)

      expect(planChildren.value).toHaveLength(NUM_EXPECTED_CHILDPLAN)
   })
})
