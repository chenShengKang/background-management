import axios from 'axios'

export function request(config){
  let instance = axios.create({
    baseURL:'',
    timeout:10000,
  })
  instance.interceptors.response.use(res => {
    return res.data
  })
  return instance(config)
}