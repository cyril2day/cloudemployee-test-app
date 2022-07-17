import { getPlans } from '../../api/plan'
import { StoreBeforeEach } from '../../utils/test-hooks'
import usePlanStore from '../plan'


vi.mock('src/api/plan')

StoreBeforeEach()

describe('Plan Store Unit Test', () => {
   afterEach(() => {
      vi.clearAllMocks()
      vi.resetModules()
   })

   test('Store gets list of plans from api', async() => {
      expect.assertions(2)
      await usePlanStore().GetPlans()

      expect(getPlans).toHaveBeenCalledTimes(1)
      expect(usePlanStore().$state.plans).toHaveLength(2)
   })  
})
