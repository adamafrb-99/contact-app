import axios from 'axios';

class Service {
  http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  constructor() {
    this.http.interceptors.response.use(
      (response) => {
        if (response.data.data) {
          return response.data;
        }
        return response;
      },
      (error) => {
        if (error?.message === 'Network Error') {
          throw new Error('Internal server error');
        }
        return Promise.reject(error);
      }
    );
  }
}

export default Service;
