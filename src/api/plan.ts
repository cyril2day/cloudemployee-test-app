/* eslint-disable */
import { api as request } from '../utils/request'

export const getPlans = (params?: any) =>
   request({
      url: '/plans',
      method: 'get',
      params
   })

export const createPlan = (params: any) =>
   request({
      url: '/plans',
      method: 'post',
      data: params
   })

export const deletePlan = (id: string) =>
   request({
      url: `/plan/${id}`,
      method: 'delete'
   })
