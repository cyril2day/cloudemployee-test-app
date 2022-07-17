import axios from 'axios'


const api = axios.create({ baseURL: 'http://localhost:8000' })

api.interceptors.request.use(
   config => {
      console.log(config)

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
