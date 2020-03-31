import axios from 'axios'

const api = axios.create({
    baseURL: "https://vuesoft1.firebaseio.com",
})
api.defaults.headers.common['Authorization'] = 'ricardo';

export default api