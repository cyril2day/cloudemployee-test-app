import axios from 'axios'


const api = axios.create({ baseURL: 'https://cloudemployee-backend-test-app.vercel.app/api' })

api.interceptors.request.use(
   config => {
      return config
   }
)

api.interceptors.response.use(
   response => {
      if (response.data)
         return response
      else
         return Promise.reject(response)
   },
   error => Promise.reject(error.response)
)

export { api }
