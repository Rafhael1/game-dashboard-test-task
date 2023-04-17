import axios, { AxiosResponse } from 'axios';
declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

const requester = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export default requester;