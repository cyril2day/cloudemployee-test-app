/* eslint-disable */
import { api as request } from '../utils/request'

export const getPlans = (params?: any) =>
   request({
      url: '/plans',
      method: 'get',
      params
   })
