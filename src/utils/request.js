import axios from 'taro-axios'
const baseURL = `http://106.54.202.8:8080/e-link-api`
const service = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000
})
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
