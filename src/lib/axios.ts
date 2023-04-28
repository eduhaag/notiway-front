import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_API_URL,
  withCredentials: true,
})

export const zipApi = axios.create({
  baseURL: import.meta.env.VITE_REACT_ZIP_API_URL,
})
