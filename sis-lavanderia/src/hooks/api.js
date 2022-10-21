import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export const useApi = () => ({
    validateToken: async (token) => {
        const response = await api.post('/user/validate', { token });
        return response.data;
    },
    login: async (user, passwd) => {
        const response = await api.post('/user/login', { user, passwd })
        return response.data;
    },
    logout: async (token) => {
        const response = await api.post('/user/logout', {token});
        return response.data;
    },
    department: async () => {
        const response = await api.get('/department');
        return response.data;
    }
});