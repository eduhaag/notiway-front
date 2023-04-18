import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.notiway.com.br/site',
  withCredentials: true,
})
