import { data } from '../../stores/sampleData'

const getPlansResponseOK = {
   data: [ ...data.plans  ]
}

export const getPlans = vi.fn(() => Promise.resolve(getPlansResponseOK))
